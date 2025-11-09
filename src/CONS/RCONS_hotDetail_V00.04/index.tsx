import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import DirectCall from "../../COMP/testWorkshop/DirectCall";
import ContextCall from "../../COMP/testWorkshop/ContextDiagram";
import SelectorCall from "../../COMP/testWorkshop/selector";
import EnviCall from "../../COMP/testWorkshop/envicall";

function Index() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>{id || "Select Call Type"}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
  
        <>
          {id === "direct-call" && <DirectCall />}
          {id === "envi-call" && <EnviCall />}
          {id === "context-call" && <ContextCall />}
          {id === "selector" && <SelectorCall />}
        </>
      
    </>
  );
}

export default Index;