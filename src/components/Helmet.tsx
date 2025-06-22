import { useEffect } from "react";

interface HelmetProps {
  title: string;
  children: React.ReactNode;
}

const Helmet = ({ title, children }: HelmetProps) => {
  useEffect(() => {
    document.title = `GitHub Finder - ${title}`;
  }, [title]);

  return <>{children}</>;
};

export default Helmet;
