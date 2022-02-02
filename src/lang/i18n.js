import i18n from "i18next";
import {fr} from "./local/fr"
import {en} from "./local/en"
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en:{
                translation :en
            }
            ,
            fr:{
                translation :fr
            }
        },
        lng: (localStorage.getItem('i18nextLng'))?localStorage.getItem('i18nextLng'):navigator.language || navigator.userLanguage,
        fallbackLng: "fr",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
