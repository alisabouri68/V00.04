import { Suspense } from "react";
import CastDesk from "../../LAYOUT/LAYO_cast_desk_V00.04"
import CastMobile from "../../LAYOUT/LAYO_cast_mobile_V00.04"
const index = () => {
    const SuspenseFallback = () => <div>Loading...Cast...</div>;
    function ResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const Layout = isMobile ? CastMobile : CastDesk;
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
