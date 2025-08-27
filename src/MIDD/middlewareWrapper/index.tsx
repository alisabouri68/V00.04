// middlewareWrapper.tsx
import { ReactNode } from "react";
import Layout from "../../LAYOUT";
import Modal from "BOX/BOX_modal";
interface MiddlewareWrapperProps {
  children?: ReactNode;
  isAuthenticated: boolean;
}
function MiddlewareWrapper({
  children,
  isAuthenticated,
}: MiddlewareWrapperProps) {
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <Layout>{children}</Layout>
      <Modal/>
      <div id="modal_root"></div>
    </>
  );
}

export default MiddlewareWrapper;
