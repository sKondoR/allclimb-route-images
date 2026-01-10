
import type { JSX } from 'react';
export default function PageDescription({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
    return (
        <div className="md:ml-35 flex mb-3 min-h-10 min-w-17">
            {children}
        </div>
    )
}