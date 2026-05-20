import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath, BlockMath } from 'react-katex';

const Introduction = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          Introduction to <span className="neon-text-blue">Triple Integration</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Welcome to the 3D realm of calculus. While single integrals help us find areas under curves and double integrals help us find volumes under surfaces, 
          <strong> triple integrals</strong> allow us to calculate properties of 3D solids like mass, center of gravity, and 4D hypervolumes.
        </p>
      </div>

      <SectionHeading>Building the Intuition</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          Imagine a solid block of metal. If the block has a uniform density, finding its mass is simple: <InlineMath math="\text{Mass} = \text{Density} \times \text{Volume}" />.
          But what if the metal block is made of an alloy where the density changes at every single point <InlineMath math="(x, y, z)" />?
        </p>
        <p>
          This is where triple integration comes in. We break the solid into infinitesimally small cubes of volume <InlineMath math="dV" />. 
          We find the mass of each tiny cube, and then we sum them all up using an integral across all three spatial dimensions.
        </p>
      </div>

      <SectionHeading>The Mathematical Definition</SectionHeading>
      <div className="mb-12">
        <p className="text-lg text-gray-300 mb-6">
          Mathematically, the triple integral of a function <InlineMath math="f(x, y, z)" /> over a closed region <InlineMath math="V" /> in 3D space is written as:
        </p>
        
        <FormulaCard 
          title="The General Form"
          math="\iiint_{V} f(x, y, z) \,dV"
          desc="Where V is the 3D volume region, f(x,y,z) is the property we are integrating, and dV is the differential volume element."
        />

        <ExamTip>
          If you set <InlineMath math="f(x, y, z) = 1" />, the triple integral simply calculates the total <strong>Volume</strong> of the region <InlineMath math="V" />. 
          This is one of the most common exam questions!
        </ExamTip>
      </div>

      <SectionHeading>How to Evaluate</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          To evaluate a triple integral, we usually convert it into an <strong>iterated integral</strong>. This means we perform three single integrations one after another, working from the inside out.
        </p>
        <div className="p-6 bg-black/40 border border-gray-700 rounded-lg">
          <BlockMath math="\int_{x_1}^{x_2} \left( \int_{y_1(x)}^{y_2(x)} \left( \int_{z_1(x,y)}^{z_2(x,y)} f(x, y, z) \,dz \right) dy \right) dx" />
        </div>
        <p>
          The most crucial step in mastering triple integration is determining the correct limits of integration. The inner limits can be functions of the outer variables, but the outermost limits <strong>must always be constants</strong>.
        </p>
      </div>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Purpose:</strong> Used to integrate over a 3D region (Volume, Mass, Center of Mass).</li>
          <li><strong>Volume Formula:</strong> <InlineMath math="\iiint_V 1 \,dV = \text{Volume of } V" />.</li>
          <li><strong>Evaluation order:</strong> Work from the innermost integral to the outermost integral.</li>
          <li><strong>Limits Rule:</strong> The outermost limits must be constant numbers. Inner limits can be variables.</li>
        </ul>
      </SummaryBox>
    </div>
  );
};

export default Introduction;
