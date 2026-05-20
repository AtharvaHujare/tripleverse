import SectionHeading from '../components/SectionHeading';
import SolvedExample from '../components/SolvedExample';
import CommonMistake from '../components/CommonMistake';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath } from 'react-katex';

const ChangeOfOrder = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          Change of <span className="neon-text-pink">Integration Order</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Sometimes, a triple integral is mathematically impossible (or extremely difficult) to evaluate in the given order 
          (e.g., <InlineMath math="dz \,dy \,dx" />). Changing the order of integration allows us to evaluate the integral by approaching the volume from a different geometric perspective.
        </p>
      </div>

      <SectionHeading>The Strategy</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          You cannot simply swap the <InlineMath math="dx" />, <InlineMath math="dy" />, and <InlineMath math="dz" /> and keep the limits the same (unless the volume is a simple rectangular box). 
          To change the order, you <strong>must completely reconstruct the region</strong> from scratch.
        </p>
        <ol className="list-decimal pl-6 space-y-3 bg-black/30 p-6 rounded-lg border border-gray-700">
          <li><strong>Extract the boundaries:</strong> Look at the given integral limits and write down the equations of all bounding surfaces.</li>
          <li><strong>Sketch the 3D solid:</strong> Draw the region bounded by these surfaces. (This is the most crucial step).</li>
          <li><strong>Choose the new inner variable:</strong> Decide your new order (e.g., <InlineMath math="dx \,dz \,dy" />). Shoot an arrow parallel to the new inner axis (e.g., the x-axis) through your 3D sketch. Where does it enter? Where does it exit? These are your new inner limits.</li>
          <li><strong>Project onto the 2D plane:</strong> Project the 3D solid onto the coordinate plane of your remaining two variables (e.g., the yz-plane).</li>
          <li><strong>Find the 2D limits:</strong> Determine the new middle and outer limits from this 2D shadow.</li>
        </ol>
      </div>

      <SectionHeading>Visualizing the Shadows</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          Depending on your new order of integration, your 2D projection (shadow) will be on a different plane:
        </p>
        <ul className="list-disc pl-8 space-y-2">
          <li>If new order ends in <InlineMath math="dy \,dx" />: Project onto the <strong>xy-plane</strong>.</li>
          <li>If new order ends in <InlineMath math="dz \,dx" />: Project onto the <strong>xz-plane</strong>.</li>
          <li>If new order ends in <InlineMath math="dz \,dy" />: Project onto the <strong>yz-plane</strong>.</li>
        </ul>

        <ExamTip>
          If you struggle to draw the 3D object, at least draw the 2D projection corresponding to the original outer two limits. 
          Often, that is enough to figure out how to swap the two outermost variables.
        </ExamTip>
      </div>

      <SectionHeading>Solved Illustrations</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Illustration 1: Swapping dx and dy"
          problemMath="\int_0^1 \int_0^{1-x} \int_0^{x+y} f(x,y,z) \,dz \,dy \,dx \rightarrow \text{ Change to } dz \,dx \,dy"
          steps={[
            {
              desc: "Step 1: Extract the boundaries from the original limits.",
              math: "z=0, z=x+y, \quad y=0, y=1-x, \quad x=0, x=1"
            },
            {
              desc: "Step 2: Notice we want to keep dz as the inner integral. So z limits remain the same.",
              math: "0 \le z \le x+y"
            },
            {
              desc: "Step 3: Look at the 2D projection in the xy-plane. It is bounded by y=0, x=0, and y=1-x (which is x+y=1).",
              math: "\text{This is a triangle with vertices } (0,0), (1,0), (0,1)."
            },
            {
              desc: "Step 4: We want the new outer variables to be dx dy. This means y is the outermost constant.",
              math: "\text{In the triangle, } y \text{ ranges from } 0 \text{ to } 1."
            },
            {
              desc: "Step 5: For a fixed y, x goes from the left boundary to the right boundary.",
              math: "x \text{ goes from } 0 \text{ to } 1-y."
            },
            {
              desc: "Step 6: Construct the new integral.",
              math: "\\int_0^1 \\int_0^{1-y} \\int_0^{x+y} f(x,y,z) \\,dz \\,dx \\,dy"
            }
          ]}
          finalAnswer="\int_0^1 \int_0^{1-y} \int_0^{x+y} f(x,y,z) \,dz \,dx \,dy"
        />
      </div>

      <CommonMistake>
        A fatal error is trying to swap limits analytically without drawing the region. For example, swapping <InlineMath math="\int_0^x dy \,dx" /> to <InlineMath math="\int_0^y dx \,dy" /> is WRONG. 
        Drawing the region shows the correct swap is <InlineMath math="\int_y^1 dx \,dy" /> (assuming x went to 1).
      </CommonMistake>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Golden Rule:</strong> Never just swap the variables. Always redraw the region.</li>
          <li><strong>Outermost limits:</strong> Must always be constants!</li>
          <li><strong>Middle limits:</strong> Can only depend on the outermost variable.</li>
          <li><strong>Innermost limits:</strong> Can depend on both outer variables.</li>
        </ul>
      </SummaryBox>

    </div>
  );
};

export default ChangeOfOrder;
