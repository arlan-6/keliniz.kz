import React from 'react';

interface Props {
  children: React.ReactNode;
}

const ConstructorLayout = ({ children }: Props) => {
  return (
    <div>
      
      <main>{children}</main>
      
    </div>
  );
};

export default ConstructorLayout;
