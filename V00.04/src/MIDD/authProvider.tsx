import Container from "../COMP/RCOM_container";
import Navigation from "../BOX/BOX_nav";
import Header from "../BOX/BOX_headerr";
import { type RoutsType } from "../TYPE/index";

interface Props {
  route: RoutsType;
}

const AuthProvider = ({ route }: Props) => {
  const { layout, element } = route;
  const shoHeader = layout?.header !== false;
  const shoAside = layout?.aside !== false;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen w-full bg-zinc-200 dark:bg-zinc-950">
      {shoHeader && <Header />}

      <main className="relative overflow-hidden">
        <Container>
          {shoAside && (
            <div className="py-1 h-full">
              <Navigation />
            </div>
          )}
          <section className="flex-1 h-full overflow-y-auto">{element}</section>
        </Container>
      </main>

      <div id="modal_root"></div>
    </div>
  );
};

export default AuthProvider;
