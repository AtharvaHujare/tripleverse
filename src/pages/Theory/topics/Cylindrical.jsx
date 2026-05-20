import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import SolvedExample from '../components/SolvedExample';
import PracticeProblem from '../components/PracticeProblem';
import CommonMistake from '../components/CommonMistake';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath, BlockMath } from 'react-katex';

const Cylindrical = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          <span className="neon-text-green">Cylindrical</span> Coordinates
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          When dealing with regions that have an axis of symmetry (like cylinders, cones, or paraboloids), 
          Cartesian coordinates become incredibly messy. Cylindrical coordinates solve this by combining polar coordinates in the 2D plane with a standard z-axis.
        </p>
      </div>

      <SectionHeading>The Coordinate Transformation</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          In cylindrical coordinates, a point is represented by <InlineMath math="(r, \theta, z)" />. 
          <InlineMath math="r" /> is the distance from the z-axis, <InlineMath math="\theta" /> is the angle in the xy-plane, and <InlineMath math="z" /> is the height.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormulaCard 
            title="Cartesian to Cylindrical"
            math="\begin{aligned} x &= r \cos(\theta) \\ y &= r \sin(\theta) \\ z &= z \end{aligned}"
          />
          <FormulaCard 
            title="Cylindrical to Cartesian"
            math="\begin{aligned} r^2 &= x^2 + y^2 \\ \tan(\theta) &= \frac{y}{x} \\ z &= z \end{aligned}"
          />
        </div>
      </div>

      <SectionHeading>The Volume Element & The Jacobian</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          When you transform the coordinates from <InlineMath math="(x,y,z)" /> to <InlineMath math="(r,\theta,z)" />, the tiny box of volume <InlineMath math="dV" /> changes shape. 
          It becomes a wedge. The volume of this wedge is not just <InlineMath math="dr \,d\theta \,dz" />!
        </p>
        <p>
          The length of the outer arc of the wedge is <InlineMath math="r \,d\theta" />. Therefore, the volume is scaled by <InlineMath math="r" />. This <InlineMath math="r" /> is known as the Jacobian determinant.
        </p>

        <FormulaCard 
          title="Cylindrical Volume Element"
          math="dV = r \, dr \, d\theta \, dz"
          desc="NEVER FORGET THE EXTRA 'r'!"
        />

        <CommonMistake>
          The most common mistake in exams is forgetting to multiply the integrand by the Jacobian <InlineMath math="r" />. 
          Always write <InlineMath math="dV = r \,dz \,dr \,d\theta" /> immediately when setting up the integral!
        </CommonMistake>
      </div>

      <SectionHeading>Solved Illustrations</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Illustration 1: Volume of a Cylinder"
          problemMath="\iiint_V dV"
          steps={[
            {
              desc: "Find the volume of a cylinder of radius R and height H. The limits are obvious in cylindrical coordinates.",
              math: "\\text{Limits: } 0 \\le z \\le H, \\quad 0 \\le r \\le R, \\quad 0 \\le \\theta \\le 2\\pi"
            },
            {
              desc: "Set up the integral. Remember dV = r dz dr dθ.",
              math: "\\int_{0}^{2\\pi} \\int_{0}^{R} \\int_{0}^{H} r \\,dz \\,dr \\,d\\theta"
            },
            {
              desc: "Since limits are constants and integrand is separable, we can split them.",
              math: "\\left( \\int_{0}^{2\\pi} 1 \\,d\\theta \\right) \\left( \\int_{0}^{R} r \\,dr \\right) \\left( \\int_{0}^{H} 1 \\,dz \\right)"
            },
            {
              desc: "Evaluate each simple integral.",
              math: "[\\theta]_0^{2\\pi} \\cdot \\left[\\frac{r^2}{2}\\right]_0^R \\cdot [z]_0^H = (2\\pi) \\cdot \\left(\\frac{R^2}{2}\\right) \\cdot (H)"
            }
          ]}
          finalAnswer="\pi R^2 H"
        />

        <SolvedExample 
          title="Illustration 2: Evaluating a Function"
          problemMath="\iiint_V (x^2 + y^2) \,dV"
          steps={[
            {
              desc: "The region V is bounded by the paraboloid z = x² + y² and the plane z = 4.",
              math: "\\text{Transform integrand: } x^2 + y^2 = r^2"
            },
            {
              desc: "Determine z limits. The floor is the paraboloid (z = r²) and the ceiling is the plane (z = 4).",
              math: "r^2 \\le z \\le 4"
            },
            {
              desc: "Determine r and θ limits. The intersection occurs at z = 4, so r² = 4 => r = 2. It's a full circle.",
              math: "0 \\le r \\le 2, \\quad 0 \\le \\theta \\le 2\\pi"
            },
            {
              desc: "Set up the integral. Don't forget the extra r from dV!",
              math: "\\int_{0}^{2\\pi} \\int_{0}^{2} \\int_{r^2}^{4} (r^2) \\cdot (r \\,dz \\,dr \\,d\\theta) = \\int_{0}^{2\\pi} \\int_{0}^{2} \\int_{r^2}^{4} r^3 \\,dz \\,dr \\,d\\theta"
            },
            {
              desc: "Integrate w.r.t z.",
              math: "\\int_{0}^{2\\pi} \\int_{0}^{2} r^3 (4 - r^2) \\,dr \\,d\\theta = \\int_{0}^{2\\pi} \\int_{0}^{2} (4r^3 - r^5) \\,dr \\,d\\theta"
            },
            {
              desc: "Integrate w.r.t r and θ.",
              math: "\\int_{0}^{2\\pi} \\left[ r^4 - \\frac{r^6}{6} \\right]_0^2 \\,d\\theta = \\int_{0}^{2\\pi} \\left( 16 - \\frac{64}{6} \\right) \\,d\\theta = \\int_{0}^{2\\pi} \\frac{16}{3} \\,d\\theta"
            }
          ]}
          finalAnswer="\frac{32\pi}{3}"
        />
      </div>

      <SectionHeading>Practice Problems</SectionHeading>
      <div className="mb-12">
        <PracticeProblem 
          difficulty="Moderate"
          problemMath="\iiint_V \sqrt{x^2+y^2} \,dV"
          solutionMath="\text{Where V is } x^2+y^2 \le 9, 0 \le z \le 2. \Rightarrow \int_0^{2\pi}\int_0^3\int_0^2 (r)(r \,dz\,dr\,d\theta) = 2\pi \cdot \left[\frac{r^3}{3}\right]_0^3 \cdot 2"
          answer="36\pi"
        />
      </div>

      <ExamTip>
        If you see <InlineMath math="x^2 + y^2" /> in the integrand or in the equations defining the region's boundaries, it is almost a guarantee that you should switch to cylindrical coordinates!
      </ExamTip>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Transformations:</strong> <InlineMath math="x = r \cos\theta" />, <InlineMath math="y = r \sin\theta" />, <InlineMath math="x^2+y^2 = r^2" />.</li>
          <li><strong>Volume Element:</strong> <InlineMath math="dV = r \,dz \,dr \,d\theta" />. </li>
          <li><strong>Best Used For:</strong> Cylinders, Cones, Paraboloids, and when you see <InlineMath math="x^2+y^2" /> symmetry about the z-axis.</li>
        </ul>
      </SummaryBox>

    </div>
  );
};

export default Cylindrical;
