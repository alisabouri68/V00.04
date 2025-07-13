import Action from "../BOX/BOX_actionn";
import MainWiki from "../COMP/RCOM_wiki/indx";
import { useLocation } from "react-router-dom";

const Mono = () => {
  const location = useLocation();
  const isWiki =
    location.pathname.includes("wikiEditor") ||
    location.pathname.includes("wikiManager");

  if (isWiki) return null;

  return (
    <div className="h-full">
      <Action jiniChild={<MainWiki />}>
        <div className="my-custom-card flex flex-col gap-3 p-3 divide-y-2 justify-center">
          <h6>Welcome To Wiki</h6>
          <p className="pt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit... Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Earum eveniet
            nemo nulla accusamus veritatis debitis mollitia tempora consequatur
            qui optio! Iusto pariatur praesentium molestias dolor facere minus
            accusamus, quisquam vitae. A praesentium repudiandae voluptatibus
            ducimus quae nulla facere accusamus, in aliquam numquam cum
            consequatur voluptas! Eius tempore voluptas dolorum numquam ipsa
            quibusdam blanditiis nostrum minus. Distinctio iusto aliquid culpa
            voluptate. Quam accusantium harum esse, suscipit animi dignissimos
            voluptatibus? Culpa aliquam atque minima cumque hic architecto dicta
            consequuntur ipsum, sit, blanditiis similique. Nulla consectetur
            sunt error tenetur, dolores vero fugit? Sint. Voluptates aliquid
            eligendi perferendis harum aspernatur, iure excepturi quas, eius
            impedit illum, sapiente dignissimos laudantium asperiores? Omnis
            quis nemo porro voluptate inventore maxime, eaque est illum animi
            nihil incidunt dolores! Omnis beatae quidem blanditiis ducimus, nemo
            sit eum aliquam deserunt, suscipit nobis voluptatem deleniti
            obcaecati, tempore a? Dignissimos odit itaque inventore molestias
            exercitationem distinctio beatae veritatis, reiciendis odio saepe
            quam. Quasi alias ipsa praesentium, harum, nihil porro expedita
            molestias commodi, odit numquam laudantium eveniet consequatur
            libero rerum! Consectetur, molestiae doloribus enim omnis fuga totam
            dicta. Cumque nostrum laudantium soluta veniam. Quod nihil, odio
            veritatis obcaecati eum eaque nisi dignissimos cum quidem veniam
            voluptas amet perferendis voluptatum asperiores esse ea minus optio
            laboriosam reiciendis enim quo, harum similique illo cupiditate.
            Consequuntur! Ducimus consequuntur voluptatibus, nulla porro numquam
            accusantium sequi voluptas modi adipisci, alias nobis rerum maiores
            aut ex. Sint odit maiores cum distinctio assumenda, hic commodi
            porro adipisci! Quidem, esse pariatur. Quasi sapiente sequi ex
            voluptate quia minima. Ullam, beatae perferendis dolor eligendi
            error aperiam eius vel quia exercitationem minus voluptatem
            voluptates qui, deleniti iste atque excepturi, impedit deserunt
            cupiditate maxime? Asperiores odit similique incidunt illum enim
            error atque maxime voluptate quasi labore corrupti numquam
            reprehenderit temporibus, quibusdam quae molestias ipsam
            voluptatibus? Fugiat exercitationem corrupti ut. Voluptatibus
            eligendi debitis ullam ipsam?
          </p>
        </div>
      </Action>
    </div>
  );
};

export default Mono;
