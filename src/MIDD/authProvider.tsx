import Container from "../COMP/RCOM_container"
import Navigation from "../BOX/BOX_nav"
import Header from "../BOX/BOX_headerr"
import { type RoutsType } from '../TYPE/index'
interface Props {
    route: RoutsType
}
const AuthProvider = ({ route }: Props) => {
    const { layout , element} = route
    const shoHeader = layout?.header !== false
    const shoAside = layout?.aside !== false
    return (
        <div className="flex flex-col w-full h-full">
            {shoHeader && <Header />}
            <main className='flex w-full grow p-2'>
                <Container>
                    {shoAside && <Navigation />}
                    <section className="flex-1">
                        {element}
                    </section>
                </Container>
            </main>

        </div>
    )
}

export default AuthProvider
