import { Suspense } from "react";
import HotDesk from "../../LAYOUT/LAYO_hot_desk_V00.04"
import HotMobile from "../../LAYOUT/LAYO_hot_mobile_V00.04"
const index = () => {
    const SuspenseFallback = () => <div>Loading...</div>;
    function ResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const Layout = isMobile ? HotMobile : HotDesk;
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
