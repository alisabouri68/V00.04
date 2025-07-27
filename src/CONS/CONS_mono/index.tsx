import { Suspense } from "react";
import MonoDesk from "../../LAYOUT/LAYO_mono_desk_V00.04"
import MonoMobile from "../../LAYOUT/LAYO_mono_mobile_V00.04"
const index = () => {
    const SuspenseFallback = () => <div>Loading...Mono...</div>;
    function ResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const Layout = isMobile ? MonoMobile : MonoDesk;
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
