import { memo } from "react";
import Button from "../RCMP_button_V00.04/index";
import { IoFilterOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { VscChecklist } from "react-icons/vsc";
import { FcMenu } from "react-icons/fc";
import { CiLock } from "react-icons/ci";
import { TiPinOutline } from "react-icons/ti";
import { HiOutlineHome } from "react-icons/hi2";
import { TbDeviceIpadHorizontalQuestion } from "react-icons/tb";
import { MdMyLocation } from "react-icons/md";

const BasketItems = () => {
  return (
    <div className="{`flex flex-col items-center w-full min-h-[60px] rounded-lg custom-card shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05),0_-2px_4px_-1px_rgba(0,0,0,0.025),inset_0_-2px_4px_rgba(0,0,0,0.05)]
    dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05),0_-2px_4px_-1px_rgba(255,255,255,0.025),inset_0_-2px_4px_rgba(255,255,255,0.05)]`}">
      <div className="w-full flex py-3 items-center justify-evenly text-text-light-custom border-b">
        <div>
          <h6>Console Basket</h6>
        </div>
        <div className="flex items-center">
          <div>
            <Button leftIcon={<IoFilterOutline />} variant="outlined" />
          </div>
          <div className="mx-2">
            <input
              type="text"
              placeholder="Search"
              className="border border-text-light-custom rounded-md outline-none focus:border-text-light-custom focus:outline-none focus:ring-0 bg-inherit"
            />
          </div>
          <div>
            <Button
              leftIcon={<VscChecklist />}
              title="List"
              variant="textActive"
            />
          </div>
          <div>
            <Button leftIcon={<CiGrid41 />} title="Icon" variant="text" />
          </div>
        </div>
        <div>
          <Button leftIcon={<IoMdClose />} variant="text" />
        </div>
      </div>
      <div className="p-3">
        <div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                <div>
                  <Button leftIcon={<FcMenu  className="me-2"/>} variant="text" size="xs" />
                </div>
                <div>
                  <Button
                    leftIcon={index <= 1 ? <CiLock /> : <TiPinOutline />}
                    variant={
                      index <= 1
                        ? "outlined"
                        : index <= 4
                        ? "filled"
                        : "outlinedActive"
                    }
                    size="xs"
                  />
                </div>
                <div>
                  <Button
                    leftIcon={
                      index === 0 ? (
                        <HiOutlineHome />
                      ) : index === 1 ? (
                        <MdMyLocation />
                      ) : (
                        <TbDeviceIpadHorizontalQuestion />
                      )
                    }
                    title={index === 0 ? "Home" : index === 1 ? "Hot" : ""}
                    variant="text"
                    size="md"
                  />
                </div>
              </div>
              <div
                className={
                  index <= 1 ? "w-full h-0.5 border border-dashed" : ""
                }
              ></div>
              <div className="w-full truncate">
                {index <= 1 ? (
                  <p className="ms-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, omnis?
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(BasketItems);
