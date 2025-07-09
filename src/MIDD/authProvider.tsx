import Container from "../COMP/RCOM_container"
import Navigation from "../BOX/BOX_nav"
import Header from "../BOX/BOX_headerr"
import { type RoutsType } from '../TYPE/index'
interface Props {
    route: RoutsType
}
const AuthProvider = ({ route }: Props) => {
    const { layout, element } = route
    const shoHeader = layout?.header !== false
    const shoAside = layout?.aside !== false
    return (
        <div className="flex flex-col w-full h-full pb-1 gap-1 bg-zinc-200 dark:bg-zinc-950">
            {shoHeader && <Header />}
            <main className='flex w-full grow relative'>
                <Container>
                   <div className="py-1 h-full">
                     {shoAside && <Navigation />}
                   </div>
                    <section className="flex-1 h-full">
                        {element}
                    </section>
                </Container>
                
            </main>
            <div id="modal_root"></div>
        </div>
    )
}

export default AuthProvider
