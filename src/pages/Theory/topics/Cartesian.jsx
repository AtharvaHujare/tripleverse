import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import SolvedExample from '../components/SolvedExample';
import PracticeProblem from '../components/PracticeProblem';
import CommonMistake from '../components/CommonMistake';
import ExamTip from '../components/ExamTip';
import { InlineMath, BlockMath } from 'react-katex';

const Cartesian = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          <span className="neon-text-pink">Cartesian</span> Coordinates
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          The Cartesian coordinate system is the standard <InlineMath math="(x, y, z)" /> grid system you are already familiar with. 
          When working with rectangular, box-like, or planar bounds, Cartesian coordinates are usually the best choice.
        </p>
      </div>

      <SectionHeading>The Volume Element</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          In a 3D Cartesian grid, our tiny differential volume element <InlineMath math="dV" /> is simply an infinitesimally small rectangular box. 
          The dimensions of this box are <InlineMath math="dx" />, <InlineMath math="dy" />, and <InlineMath math="dz" />.
        </p>
        
        <FormulaCard 
          title="Cartesian Volume Element"
          math="dV = dx \, dy \, dz"
          desc="The order of differentials (dx dy dz vs dz dy dx) depends on the order of integration."
        />
      </div>

      <SectionHeading>Setting up the Limits</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          When you are given a solid bounded by surfaces (like planes, paraboloids, or spheres), you must determine the limits of integration.
          The standard approach is projecting the solid onto one of the coordinate planes (usually the <InlineMath math="xy" />-plane).
        </p>
        <ol className="list-decimal pl-6 space-y-3 bg-black/30 p-6 rounded-lg border border-gray-700">
          <li><strong>Inner Integral (z):</strong> Find the lower surface <InlineMath math="z = f_1(x,y)" /> and upper surface <InlineMath math="z = f_2(x,y)" />.</li>
          <li><strong>Middle Integral (y):</strong> Project the solid onto the xy-plane to find a 2D region. Find the lower boundary <InlineMath math="y = g_1(x)" /> and upper boundary <InlineMath math="y = g_2(x)" />.</li>
          <li><strong>Outer Integral (x):</strong> Find the absolute minimum and maximum constant values of <InlineMath math="x" /> in the projected 2D region: <InlineMath math="x \in [a, b]" />.</li>
        </ol>

        <CommonMistake>
          Students often leave variables in the outermost integral limits. The outermost integral <strong>MUST</strong> have constant numerical limits. 
          If you end up with variables after completing the final integration, you have set up the limits incorrectly!
        </CommonMistake>
      </div>

      <SectionHeading>Solved Illustrations</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Illustration 1: Constant Limits"
          problemMath="\int_{0}^{2} \int_{-1}^{1} \int_{0}^{3} (x^2 + yz) \,dz \,dy \,dx"
          steps={[
            {
              desc: "Step 1: Integrate with respect to z (treat x and y as constants).",
              math: "\\int_{0}^{2} \\int_{-1}^{1} \\left[ x^2z + \\frac{yz^2}{2} \\right]_0^3 \\,dy \\,dx"
            },
            {
              desc: "Step 2: Substitute z = 3 and z = 0.",
              math: "\\int_{0}^{2} \\int_{-1}^{1} \\left( 3x^2 + \\frac{9y}{2} \\right) \\,dy \\,dx"
            },
            {
              desc: "Step 3: Integrate with respect to y.",
              math: "\\int_{0}^{2} \\left[ 3x^2y + \\frac{9y^2}{4} \\right]_{-1}^1 \\,dx"
            },
            {
              desc: "Step 4: Substitute y = 1 and y = -1. Notice the y^2 terms cancel out.",
              math: "\\int_{0}^{2} (3x^2(1) - 3x^2(-1)) \\,dx = \\int_{0}^{2} 6x^2 \\,dx"
            },
            {
              desc: "Step 5: Integrate with respect to x.",
              math: "\\left[ 2x^3 \\right]_0^2 = 2(8) - 0 = 16"
            }
          ]}
          finalAnswer="16"
        />

        <SolvedExample 
          title="Illustration 2: Variable Limits (Volume of a Tetrahedron)"
          problemMath="\iiint_V dV"
          steps={[
            {
              desc: "The region V is bounded by x=0, y=0, z=0, and the plane x+y+z=1. We are finding the volume.",
              math: "\\text{Limits for z: } z \text{ goes from } 0 \text{ to } 1-x-y"
            },
            {
              desc: "Project onto the xy-plane (set z=0). The region is bounded by x=0, y=0, and x+y=1.",
              math: "\\text{Limits for y: } y \text{ goes from } 0 \text{ to } 1-x"
            },
            {
              desc: "Limits for x in the projected triangle.",
              math: "\\text{Limits for x: } x \text{ goes from } 0 \text{ to } 1"
            },
            {
              desc: "Set up the full integral and integrate w.r.t z.",
              math: "\\int_{0}^{1} \\int_{0}^{1-x} \\int_{0}^{1-x-y} 1 \\,dz \\,dy \\,dx = \\int_{0}^{1} \\int_{0}^{1-x} (1-x-y) \\,dy \\,dx"
            },
            {
              desc: "Integrate w.r.t y.",
              math: "\\int_{0}^{1} \\left[ (1-x)y - \\frac{y^2}{2} \\right]_0^{1-x} \\,dx = \\int_{0}^{1} \\frac{(1-x)^2}{2} \\,dx"
            },
            {
              desc: "Integrate w.r.t x to get the final volume.",
              math: "\\left[ -\\frac{(1-x)^3}{6} \\right]_0^1 = 0 - \\left( -\\frac{1}{6} \\right) = \\frac{1}{6}"
            }
          ]}
          finalAnswer="\frac{1}{6}"
        />
      </div>

      <SectionHeading>Practice Problems</SectionHeading>
      <div className="mb-12">
        <PracticeProblem 
          difficulty="Beginner"
          problemMath="\int_{0}^{1} \int_{0}^{2} \int_{0}^{3} xyz \,dz \,dy \,dx"
          solutionMath="\int_0^1 x \,dx \cdot \int_0^2 y \,dy \cdot \int_0^3 z \,dz = \left[\frac{1}{2}\right]\left[2\right]\left[\frac{9}{2}\right]"
          answer="9/2"
        />
        
        <PracticeProblem 
          difficulty="Moderate"
          problemMath="\int_{0}^{\pi} \int_{0}^{1} \int_{0}^{y} y \sin(x) \,dz \,dy \,dx"
          solutionMath="\int_0^\pi \sin(x) \,dx \int_0^1 \int_0^y y \,dz \,dy = [-\cos(x)]_0^\pi \cdot \int_0^1 y^2 \,dy = (2) \cdot \left[\frac{1}{3}\right]"
          answer="2/3"
        />
      </div>

      <ExamTip>
        If the limits of integration are all constants, and the function <InlineMath math="f(x,y,z)" /> can be separated into <InlineMath math="g(x)h(y)p(z)" />, 
        you can break the triple integral into the product of three separate single integrals! This saves massive amounts of time in exams.
      </ExamTip>

    </div>
  );
};

export default Cartesian;
