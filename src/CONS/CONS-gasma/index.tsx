import { Suspense } from "react";
import GasmaDesk from "../../LAYOUT/LAYO_gasma_desk_V00.04"
import GasmaMobile from "../../LAYOUT/LAYO_gasma_mobile_V00.04"
const index = () => {
    const SuspenseFallback = () => <div>Loading...</div>;
    function ResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const Layout = isMobile ? GasmaMobile : GasmaDesk;
        return (
            <Suspense fallback={<SuspenseFallback />}>
                <Layout />
            </Suspense>
        );
    }
    return (
        <>
            <ResponsiveLayout />
        </>
    )
}

export default index
