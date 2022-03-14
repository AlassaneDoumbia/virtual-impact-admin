import React from "react";
import { useTranslation } from 'react-i18next';

// components
const CardQuote = ({ theadData, tbodyData, elt , color, addEndpoint, icon, navHeader}) => {

  const {i18n } = useTranslation();
// export default function CardQuote() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  // src={require("assets/img/team-2-800x800.jpg").default}
                  src={require("assets/img/pp.jpeg").default}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <div className="mb-2 text-blueGray-700 mt-10">
                {i18n.t("admin.quoteText")}
              </div>
              {/* <a
                    href="#pablo"
                    className="font-normal text-lightBlue-500"
                    onClick={(e) => e.preventDefault()}
                  >
                    Show more
                  </a> */}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default CardQuote;