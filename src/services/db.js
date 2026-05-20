import { questions, practiceTopics } from '../data/practiceQuestions';

const DB_KEY = 'tripleverse_progress';

const getInitialState = () => ({
  attempts: [],
  unlocked: ['q1_t6', 'q1_t7', 'q1_t8', 'q1_t9'] // First question of each topic is unlocked
});

const loadDb = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) return getInitialState();
  try {
    return JSON.parse(data);
  } catch {
    return getInitialState();
  }
};

const saveDb = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const resetProgress = () => {
  saveDb(getInitialState());
};

export const recordAttempt = (qId, topicId, isCorrect, timeTaken) => {
  const db = loadDb();
  db.attempts.push({
    questionId: qId,
    topicId,
    isCorrect,
    timeTaken,
    timestamp: Date.now()
  });

  if (isCorrect) {
    // Find the next question in the topic and unlock it
    const topicQuestions = questions.filter(q => q.topicId === topicId);
    const currentIndex = topicQuestions.findIndex(q => q.id === qId);
    
    if (currentIndex !== -1 && currentIndex < topicQuestions.length - 1) {
      const nextQId = topicQuestions[currentIndex + 1].id;
      if (!db.unlocked.includes(nextQId)) {
        db.unlocked.push(nextQId);
      }
    }
  }

  saveDb(db);
};

export const getQuestionState = (qId) => {
  const db = loadDb();
  const qAttempts = db.attempts.filter(a => a.questionId === qId);
  
  if (qAttempts.some(a => a.isCorrect)) {
    return 'solved';
  }
  
  if (qAttempts.length > 0) {
    return 'wrong'; // Attempted but never correct
  }
  
  if (db.unlocked.includes(qId)) {
    return 'unlocked';
  }
  
  return 'locked';
};

export const getTopicProgress = (topicId) => {
  const db = loadDb();
  const topicQuestions = questions.filter(q => q.topicId === topicId);
  
  let solvedCount = 0;
  for (const q of topicQuestions) {
    const qAttempts = db.attempts.filter(a => a.questionId === q.id);
    if (qAttempts.some(a => a.isCorrect)) {
      solvedCount++;
    }
  }
  
  return {
    solvedCount,
    total: topicQuestions.length
  };
};

export const getAnalytics = () => {
  const db = loadDb();
  if (db.attempts.length === 0) {
    return null; // Zero state
  }

  // Solved Questions (unique)
  const solvedSet = new Set(db.attempts.filter(a => a.isCorrect).map(a => a.questionId));
  const solvedCount = solvedSet.size;

  // Overall Accuracy
  const correctAttempts = db.attempts.filter(a => a.isCorrect).length;
  const totalAttempts = db.attempts.length;
  const accuracy = Math.round((correctAttempts / totalAttempts) * 100) || 0;

  // Topic Performance (to find weak/strong)
  const topicStats = {};
  db.attempts.forEach(a => {
    if (!topicStats[a.topicId]) {
      topicStats[a.topicId] = { correct: 0, total: 0, timeTaken: 0 };
    }
    topicStats[a.topicId].total++;
    topicStats[a.topicId].timeTaken += a.timeTaken;
    if (a.isCorrect) {
      topicStats[a.topicId].correct++;
    }
  });

  let weakTopics = [];
  let strongTopics = [];
  let mostCommonMistake = "None";

  const topicsArray = Object.entries(topicStats).map(([id, stats]) => {
    const acc = stats.correct / stats.total;
    const topicInfo = practiceTopics.find(t => t.id === id);
    return {
      id,
      title: topicInfo ? topicInfo.title : id,
      accuracy: acc,
      avgTime: stats.timeTaken / stats.total
    };
  });

  if (topicsArray.length > 0) {
    topicsArray.sort((a, b) => a.accuracy - b.accuracy);
    // Topics with < 60% accuracy are weak
    weakTopics = topicsArray.filter(t => t.accuracy < 0.6).map(t => t.title);
    // Topics with > 80% accuracy are strong
    strongTopics = topicsArray.filter(t => t.accuracy > 0.8).map(t => t.title);

    // Naive mistake mapping based on weakest topic
    if (weakTopics.length > 0) {
      const weakest = topicsArray[0].id;
      if (weakest === 'type_7') mostCommonMistake = "Incorrectly assigning non-given limits.";
      else if (weakest === 'type_8') mostCommonMistake = "Spherical coordinate volume conversion errors.";
      else if (weakest === 'type_9') mostCommonMistake = "Misunderstanding bounding surfaces.";
      else mostCommonMistake = "Evaluation of inner integrals.";
    }
  }

  // Chart Data: Accuracy Trend (group attempts by chunks of 3 for a smooth line, or simply chronological)
  let trendData = [];
  let chunkCorrect = 0;
  db.attempts.forEach((a, i) => {
    if (a.isCorrect) chunkCorrect++;
    if ((i + 1) % 3 === 0 || i === db.attempts.length - 1) {
      trendData.push(Math.round((chunkCorrect / ((i % 3) + 1)) * 100));
      chunkCorrect = 0;
    }
  });

  return {
    solvedCount,
    accuracy,
    weakTopics,
    strongTopics,
    mostCommonMistake,
    trendData,
    totalAttempts,
    correctAttempts,
    wrongAttempts: totalAttempts - correctAttempts
  };
};
