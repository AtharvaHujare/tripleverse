import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import SolvedExample from '../components/SolvedExample';
import PracticeProblem from '../components/PracticeProblem';
import CommonMistake from '../components/CommonMistake';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath, BlockMath } from 'react-katex';

const Spherical = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          <span className="neon-text-purple">Spherical Polar</span> Coordinates
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          When dealing with spheres, hemispheres, or cones starting from the origin, Cartesian and Cylindrical coordinates 
          can become incredibly difficult. Spherical coordinates represent points in 3D space using one distance and two angles, perfectly matching spherical symmetries.
        </p>
      </div>

      <SectionHeading>The Coordinate System</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          A point in spherical coordinates is given by <InlineMath math="(\rho, \phi, \theta)" />:
        </p>
        <ul className="list-disc pl-8 space-y-3">
          <li><strong><InlineMath math="\rho" /> (rho):</strong> The straight-line distance from the origin to the point. <InlineMath math="\rho \ge 0" />.</li>
          <li><strong><InlineMath math="\phi" /> (phi):</strong> The angle dropped down from the positive z-axis. <InlineMath math="0 \le \phi \le \pi" />.</li>
          <li><strong><InlineMath math="\theta" /> (theta):</strong> The angle in the xy-plane (same as in cylindrical coordinates). <InlineMath math="0 \le \theta \le 2\pi" />.</li>
        </ul>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <FormulaCard 
            title="Cartesian to Spherical"
            math="\begin{aligned} x &= \rho \sin(\phi) \cos(\theta) \\ y &= \rho \sin(\phi) \sin(\theta) \\ z &= \rho \cos(\phi) \end{aligned}"
          />
          <FormulaCard 
            title="Spherical to Cartesian"
            math="\begin{aligned} \rho^2 &= x^2 + y^2 + z^2 \\ \tan(\theta) &= \frac{y}{x} \\ \cos(\phi) &= \frac{z}{\rho} \end{aligned}"
          />
        </div>
      </div>

      <SectionHeading>The Volume Element</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          Transforming from Cartesian to Spherical warps the volume element dramatically. 
          The Jacobian determinant for this transformation evaluates to <InlineMath math="\rho^2 \sin(\phi)" />.
        </p>

        <FormulaCard 
          title="Spherical Volume Element"
          math="dV = \rho^2 \sin(\phi) \, d\rho \, d\phi \, d\theta"
          desc="This is the most easily forgotten term in all of multivariable calculus."
        />

        <CommonMistake>
          Never write <InlineMath math="dV = d\rho \, d\phi \, d\theta" />! Always include the <InlineMath math="\rho^2 \sin(\phi)" /> term. 
          Also, be extremely careful: <InlineMath math="\phi" /> (the angle from the z-axis) only goes from <InlineMath math="0" /> to <InlineMath math="\pi" />, NOT <InlineMath math="2\pi" />!
        </CommonMistake>
      </div>

      <SectionHeading>Solved Illustrations</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Illustration 1: Volume of a Sphere"
          problemMath="\iiint_V dV"
          steps={[
            {
              desc: "Find the volume of a sphere of radius R. The bounds are the entire sphere.",
              math: "0 \le \rho \le R, \quad 0 \le \phi \le \pi, \quad 0 \le \theta \le 2\pi"
            },
            {
              desc: "Set up the integral with the spherical volume element.",
              math: "\\int_{0}^{2\\pi} \\int_{0}^{\\pi} \\int_{0}^{R} \\rho^2 \\sin(\\phi) \\,d\\rho \\,d\\phi \\,d\\theta"
            },
            {
              desc: "Since limits are constant and the integrand is separable, we can split the integrals into a product.",
              math: "\\left( \\int_{0}^{2\\pi} d\\theta \\right) \\left( \\int_{0}^{\\pi} \\sin(\\phi) \\,d\\phi \\right) \\left( \\int_{0}^{R} \\rho^2 \\,d\\rho \\right)"
            },
            {
              desc: "Evaluate the theta integral.",
              math: "[\\theta]_0^{2\\pi} = 2\\pi"
            },
            {
              desc: "Evaluate the phi integral.",
              math: "[-\\cos(\\phi)]_0^{\\pi} = -(-1) - (-1) = 2"
            },
            {
              desc: "Evaluate the rho integral.",
              math: "\\left[ \\frac{\\rho^3}{3} \\right]_0^R = \\frac{R^3}{3}"
            },
            {
              desc: "Multiply them all together.",
              math: "(2\\pi) \\cdot (2) \\cdot \\left(\\frac{R^3}{3}\\right) = \\frac{4}{3}\\pi R^3"
            }
          ]}
          finalAnswer="\frac{4}{3}\pi R^3"
        />
      </div>

      <SectionHeading>Practice Problems</SectionHeading>
      <div className="mb-12">
        <PracticeProblem 
          difficulty="Advanced"
          problemMath="\iiint_V e^{(x^2+y^2+z^2)^{3/2}} \,dV"
          solutionMath="\text{For unit sphere. Integrand is } e^{\rho^3}. \text{ Integral: } \int_0^{2\pi} \int_0^\pi \int_0^1 e^{\rho^3} \rho^2 \sin\phi \,d\rho \,d\phi \,d\theta = \frac{4\pi(e-1)}{3}"
          answer="\frac{4\pi(e-1)}{3}"
        />
      </div>

      <ExamTip>
        If the region is a hemisphere sitting <strong>above</strong> the xy-plane, the limits for <InlineMath math="\phi" /> are <InlineMath math="0 \le \phi \le \pi/2" />. 
        If it's the whole sphere, <InlineMath math="\phi" /> goes to <InlineMath math="\pi" />.
      </ExamTip>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Transformations:</strong> <InlineMath math="x^2+y^2+z^2 = \rho^2" />.</li>
          <li><strong>Volume Element:</strong> <InlineMath math="dV = \rho^2 \sin(\phi) \,d\rho \,d\phi \,d\theta" />. </li>
          <li><strong>Limits:</strong> <InlineMath math="\rho \ge 0" />, <InlineMath math="0 \le \phi \le \pi" />, <InlineMath math="0 \le \theta \le 2\pi" />.</li>
        </ul>
      </SummaryBox>

    </div>
  );
};

export default Spherical;
