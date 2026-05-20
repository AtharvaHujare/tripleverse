import SectionHeading from '../components/SectionHeading';
import FormulaCard from '../components/FormulaCard';
import SolvedExample from '../components/SolvedExample';
import ExamTip from '../components/ExamTip';
import SummaryBox from '../components/SummaryBox';
import { InlineMath, BlockMath } from 'react-katex';

const Applications = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          Triple Integrals <span className="neon-text-green">Applications</span>
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed">
          Triple integrals aren't just for finding abstract 4D hypervolumes. In physics and engineering, 
          they are the primary tool used to analyze 3D solids with varying density to find mass, center of mass, and moments of inertia.
        </p>
      </div>

      <SectionHeading>Mass and Density</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          If a 3D solid <InlineMath math="V" /> has a uniform density, its mass is simply <InlineMath math="M = \text{Density} \times \text{Volume}" />. 
          However, real-world objects often have varying density. We describe this with a density function <InlineMath math="\rho(x,y,z)" />.
        </p>
        
        <FormulaCard 
          title="Total Mass"
          math="M = \iiint_V \rho(x,y,z) \,dV"
          desc="Integrating the density function over the volume gives the total mass."
        />
      </div>

      <SectionHeading>Center of Mass</SectionHeading>
      <div className="text-lg text-gray-300 space-y-6 mb-12">
        <p>
          The center of mass <InlineMath math="(\bar{x}, \bar{y}, \bar{z})" /> is the balance point of the solid. 
          To find it, we must calculate the <strong>moments</strong> of the solid about the three coordinate planes.
        </p>
        <p>
          The moment about the yz-plane (<InlineMath math="M_{yz}" />) measures the tendency of the solid to rotate around the yz-plane. 
          We find it by multiplying the density by the distance from the yz-plane (which is <InlineMath math="x" />).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormulaCard 
            title="Moment M_yz"
            math="M_{yz} = \iiint_V x \, \rho(x,y,z) \,dV"
          />
          <FormulaCard 
            title="Moment M_xz"
            math="M_{xz} = \iiint_V y \, \rho(x,y,z) \,dV"
          />
          <FormulaCard 
            title="Moment M_xy"
            math="M_{xy} = \iiint_V z \, \rho(x,y,z) \,dV"
          />
        </div>

        <p className="mt-6">Once we have the moments and the total mass <InlineMath math="M" />, the center of mass coordinates are simply:</p>
        
        <FormulaCard 
          title="Center of Mass Coordinates"
          math="\bar{x} = \frac{M_{yz}}{M}, \quad \bar{y} = \frac{M_{xz}}{M}, \quad \bar{z} = \frac{M_{xy}}{M}"
        />
      </div>

      <SectionHeading>Solved Illustrations</SectionHeading>
      <div className="mb-12">
        <SolvedExample 
          title="Illustration: Mass of a Cube"
          problemMath="M = \iiint_V \rho(x,y,z) \,dV"
          steps={[
            {
              desc: "Find the mass of a cube bounded by x=0, x=1, y=0, y=1, z=0, z=1 if its density is given by ρ(x,y,z) = x + y + z.",
              math: "M = \\int_0^1 \\int_0^1 \\int_0^1 (x+y+z) \\,dz \\,dy \\,dx"
            },
            {
              desc: "Integrate with respect to z.",
              math: "\\int_0^1 \\int_0^1 \\left[ xz + yz + \\frac{z^2}{2} \\right]_0^1 \\,dy \\,dx = \\int_0^1 \\int_0^1 (x + y + \\frac{1}{2}) \\,dy \\,dx"
            },
            {
              desc: "Integrate with respect to y.",
              math: "\\int_0^1 \\left[ xy + \\frac{y^2}{2} + \\frac{y}{2} \\right]_0^1 \\,dx = \\int_0^1 (x + \\frac{1}{2} + \\frac{1}{2}) \\,dx = \\int_0^1 (x + 1) \\,dx"
            },
            {
              desc: "Integrate with respect to x.",
              math: "\\left[ \\frac{x^2}{2} + x \\right]_0^1 = \\frac{1}{2} + 1 = \\frac{3}{2}"
            }
          ]}
          finalAnswer="\frac{3}{2}"
        />
      </div>

      <ExamTip>
        If the density is uniform (constant), the center of mass is called the <strong>centroid</strong>. 
        In this case, the density <InlineMath math="\rho" /> cancels out of the fraction <InlineMath math="\frac{M_{yz}}{M}" />, so you can just set <InlineMath math="\rho = 1" /> for simplicity!
      </ExamTip>

      <SummaryBox>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Volume:</strong> <InlineMath math="\iiint_V 1 \,dV" /></li>
          <li><strong>Mass:</strong> <InlineMath math="\iiint_V \rho \,dV" /></li>
          <li><strong>Center of Mass:</strong> <InlineMath math="(\frac{M_{yz}}{M}, \frac{M_{xz}}{M}, \frac{M_{xy}}{M})" /></li>
          <li>Always look for symmetry! If a region and its density are symmetric about the yz-plane, then <InlineMath math="\bar{x} = 0" /> automatically.</li>
        </ul>
      </SummaryBox>

    </div>
  );
};

export default Applications;
