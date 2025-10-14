import { ReactNode} from 'react';

interface IProps {
  children: ReactNode;
  modal: ReactNode;

};

const ProductsLayout = async ({ children, modal }: IProps) => {

  return (
      <section>
          <div className="">
              {children}
          </div>
          {modal}
      </section>
  );
};

export default ProductsLayout;


