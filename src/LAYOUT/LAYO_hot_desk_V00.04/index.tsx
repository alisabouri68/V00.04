import Navigator from "../../COMP/RCMP_navigator_VAR.01_V00.04"
import BoxHeader from "../../BOX/BOX_header"
import BoxNav from "../../BOX/BOX_nav"
import BoxJinni from "../../BOX/BOX_Jinni"
import BoxAuxilary from "../../BOX/BOX_auxiliary"
import ActionMenue from "../../BOX/BOX_actiomMenue"
import ActionContent from "../../BOX/BOX_actionContent"
import BOX_assistant from "BOX/BOX_assistant"

const index = () => {
  return (
    <>
      <BoxHeader console="HOT" />
      <div className="flex flex-1 h-[calc(100% - 56px)] p-1 overflow-hidden">
        <BoxNav >
          <Navigator />
        </BoxNav>
        <div className="flex w-full h-full">
          <div className="relative flex flex-col h-full w-9/12 rounded-md overflow-y-auto custom-scrollbar ms-1 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-300">
            <BoxJinni />
            <ActionMenue>
              Action Menu HOT
            </ActionMenue>
            <ActionContent>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam, ducimus accusamus. In nemo ipsam id consectetur, sit earum dolor vitae itaque neque dolore ipsum porro laudantium non corporis animi quo.
              Nam error fugit dolores nesciunt cupiditate earum autem iusto repudiandae laborum eveniet assumenda, reprehenderit sunt minus consequuntur doloremque voluptate dolore aperiam voluptates accusantium. Iste excepturi architecto et aliquid, fugit dolore?
              Saepe suscipit incidunt error velit id nam deleniti totam quisquam impedit? Nihil aliquid unde nisi, consequuntur mollitia alias suscipit labore et consectetur illum fugiat asperiores architecto tenetur maxime distinctio quas.
              Dolores qui obcaecati harum accusamus, molestiae adipisci cum, consequatur voluptatem perferendis, rerum neque. Enim eum neque quia molestias illo laboriosam aut delectus, dolor, ratione rem laborum pariatur sapiente eos recusandae?
              Ipsa ducimus dicta, atque est fugit quidem, doloribus sunt iste alias facere, quibusdam odio reiciendis voluptatum necessitatibus ab culpa pariatur error! At esse voluptates nobis excepturi in distinctio eos quis.
              Possimus aperiam officiis, veniam, explicabo nobis eos, asperiores voluptates dicta quos quis eveniet perspiciatis. Modi veniam vero quae error. Itaque aut ratione ipsam voluptates error dolorum veniam adipisci eum vero.
              Maxime rerum id quos nulla eius amet consequatur qui expedita, sunt deserunt nam laborum inventore in hic. Natus nemo qui magni et impedit quos, ut ab odio provident hic culpa.
              Distinctio rem reiciendis, eveniet esse beatae aspernatur cum nulla, quidem assumenda debitis quia. Sed obcaecati quo dignissimos, corporis, harum, ipsum nemo laudantium ipsa consequatur laborum aperiam! Odit minima aliquam adipisci!
              Error, consequatur iste distinctio minima eaque placeat sed nihil, aut doloribus fugiat tenetur id labore suscipit omnis consectetur, quod quo. Accusamus unde facere eos maiores dicta ad natus, error tenetur.
              Deserunt nemo vel quisquam distinctio nam ea omnis porro in, soluta aut mollitia atque eos inventore tenetur. Et similique ut est officia omnis, eligendi consequuntur blanditiis optio mollitia doloribus! Perspiciatis?
            </ActionContent>
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-900/90 z-10"></div>
          </div>
          <div className="w-3/12 ps-1">
                            <BoxAuxilary>
                                Auxilary HOT
                                <BOX_assistant>
                                    BOX_assistant HOT
                                    <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, possimus.</p>
                                </BOX_assistant>
                            </BoxAuxilary>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
