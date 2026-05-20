import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import SolvedExample from '../components/SolvedExample';
import CommonMistake from '../components/CommonMistake';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath, BlockMath } from 'react-katex';

const Jacobian = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          The <span className="neon-text-blue">Jacobian</span> Concept
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          When we transition from Cartesian coordinates <InlineMath math="(x,y,z)" /> to a new coordinate system <InlineMath math="(u,v,w)" />, 
          the shape and volume of our infinitesimal integration blocks change. The Jacobian is the mathematical tool that scales the volume correctly.
        </p>
      </div>

      <SectionHeading>Geometric Intuition</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          Think of the Jacobian as a <strong>magnification factor</strong>. If you draw a small 1x1x1 cube in the <InlineMath math="(u,v,w)" /> space, 
          when mapped back to the <InlineMath math="(x,y,z)" /> space, it might be stretched, rotated, or squished into a parallelepiped. 
        </p>
        <p>
          The absolute value of the Jacobian determinant gives exactly the volume of this new warped shape. 
          Without it, your integral will calculate the wrong volume!
        </p>
      </div>

      <SectionHeading>Mathematical Definition</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          Let <InlineMath math="x = f(u,v,w)" />, <InlineMath math="y = g(u,v,w)" />, and <InlineMath math="z = h(u,v,w)" />. 
          The Jacobian determinant <InlineMath math="J" /> (or <InlineMath math="\frac{\partial(x,y,z)}{\partial(u,v,w)}" />) is the determinant of the Jacobian matrix of partial derivatives.
        </p>

        <FormulaCard 
          title="The Jacobian Determinant"
          math="J = \frac{\partial(x,y,z)}{\partial(u,v,w)} = \begin{vmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} & \frac{\partial x}{\partial w} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} & \frac{\partial y}{\partial w} \\ \frac{\partial z}{\partial u} & \frac{\partial z}{\partial v} & \frac{\partial z}{\partial w} \end{vmatrix}"
        />
        
        <FormulaCard 
          title="The Transformation Formula"
          math="\iiint_{V} f(x,y,z) \,dx\,dy\,dz = \iiint_{V'} f(u,v,w) \left| J \right| \,du\,dv\,dw"
          desc="We take the absolute value of the Jacobian because volume cannot be negative."
        />

        <CommonMistake>
          Students often forget to take the <strong>absolute value</strong> of the determinant. If your Jacobian comes out negative (e.g., <InlineMath math="-r" />), 
          you must use <InlineMath math="|J| = r" /> in the integral. Volume is always strictly positive!
        </CommonMistake>
      </div>

      <SectionHeading>Deriving Standard Jacobians</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Derivation: Cylindrical Coordinates"
          problemMath="x = r \cos\theta, \quad y = r \sin\theta, \quad z = z"
          steps={[
            {
              desc: "Set up the Jacobian determinant.",
              math: "J = \\begin{vmatrix} \\frac{\\partial x}{\\partial r} & \\frac{\\partial x}{\\partial \\theta} & \\frac{\\partial x}{\\partial z} \\\\ \\frac{\\partial y}{\\partial r} & \\frac{\\partial y}{\\partial \\theta} & \\frac{\\partial y}{\\partial z} \\\\ \\frac{\\partial z}{\\partial r} & \\frac{\\partial z}{\\partial \\theta} & \\frac{\\partial z}{\\partial z} \\end{vmatrix}"
            },
            {
              desc: "Calculate the partial derivatives.",
              math: "J = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta & 0 \\\\ \\sin\\theta & r\\cos\\theta & 0 \\\\ 0 & 0 & 1 \\end{vmatrix}"
            },
            {
              desc: "Expand the determinant along the third row.",
              math: "J = 1 \\cdot (\\cos\\theta \\cdot r\\cos\\theta - (-r\\sin\\theta) \\cdot \\sin\\theta)"
            },
            {
              desc: "Simplify using the Pythagorean identity.",
              math: "J = r\\cos^2\\theta + r\\sin^2\\theta = r(\\cos^2\\theta + \\sin^2\\theta) = r"
            }
          ]}
          finalAnswer="r"
        />
      </div>

      <ExamTip>
        If finding <InlineMath math="\frac{\partial(x,y,z)}{\partial(u,v,w)}" /> is too difficult because equations are given as <InlineMath math="u = f(x,y,z)" />, 
        you can use the property: <InlineMath math="J = \left( \frac{\partial(u,v,w)}{\partial(x,y,z)} \right)^{-1}" />.
      </ExamTip>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Purpose:</strong> Scales the volume element when changing coordinate systems.</li>
          <li><strong>Formula:</strong> The absolute value of the determinant of the matrix of first-order partial derivatives.</li>
          <li><strong>Cylindrical Jacobian:</strong> <InlineMath math="|J| = r" />.</li>
          <li><strong>Spherical Jacobian:</strong> <InlineMath math="|J| = \rho^2 \sin\phi" />.</li>
        </ul>
      </SummaryBox>

    </div>
  );
};

export default Jacobian;
