import React, {useState, useEffect} from "react"; 
// import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useLocation} from 'react-router-dom'
import Toast from "light-toast";
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import {useSelector, connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {setFormValid } from 'store/actions/auth'
import AsyncSelect from 'react-select/async'
import {getChapitre, updateChapitre, createChapitre, set_chapitre, set_chapitres} from 'store/actions/chapitre/chapitre';
import {getModules} from 'store/actions/module/module';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';
import {controlChapitreInput} from 'helpers/helperFunctions';

// export default function Login() {
const ChapitreForm = (props) => {
    const {  i18n } = useTranslation();
    const location = useLocation();
    const accessToken = useSelector(state => state.accessToken)
    const [inputValue, setInputValue] = useState('')
    const [selectedValue, setSelectedValue] = useState(null);
    const [contentEditor, setContentEditor] = useState();
   
    const [chapitreInfo, setchapitreInfo] = useState({
        identifiant:props.match.params?.identifiant,
        description:"", 
        libelle:"",
        contenu:"",
        document:"",
        lienVideo:"",
        chapitreModule:"",
    })

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        setContentEditor(content);
    }

    const handleChange = (event) =>{
        setchapitreInfo({...chapitreInfo,[event.target.name]: event.target.value})
    }
    
    
    const handleInputChange = (newValue) => {
        console.log("inputValue" + newValue)
        setInputValue(newValue)
    };

    const handleChangeOp = value => {
        console.log("inputValue" + value)
        setSelectedValue(value);
    }
    

    const filtermodules = () => {
        return props.modules?.filter(i =>
          i.nom.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
      
    const loadOptions = (inputValue, callback) => {
        console.log(props.modules);
        setTimeout(() => {
            callback(filtermodules(inputValue));
        }, 1000);
    };

  
    const save = () => {
        let data ={
            libelle:chapitreInfo.libelle  ,
            description:chapitreInfo.description,
            contenu:contentEditor,
            lienVideo:chapitreInfo.lienVideo,
            idModule:selectedValue.identifiant,
        }
        console.log(data);
        const payload = {data:data,token:accessToken}
        console.log("payload :::::",payload);
        (controlChapitreInput(data))?
        props.createChapitre(payload) : Toast.fail(i18n.t('admin.controlInput'), 3000);
    }
    const update = async () => {
        
        let data ={
            libelle:chapitreInfo.libelle ||  props.chapitre.libelle,
            description:chapitreInfo.description ||  props.chapitre.description,
            contenu:contentEditor || props.chapitre.contenu,
            lienVideo:chapitreInfo.lienVideo || props.chapitre.lienVideo,
            idModule:selectedValue?.identifiant || props.chapitre?.chapitreModule?.identifiant,
            idChapitre:props.match.params.id,
        }
        const payload = {data:data,token:accessToken}
        console.log("payload :::::",payload);
        (controlChapitreInput(data))?
        props.updateChapitre(payload) : Toast.fail(i18n.t('admin.controlInput'), 3000);
  
    }
    const handleSubmitform = (event) =>{
        // handleSelectChange(chapitreInfo.type)
        if(event.which === 13 || event.keyCode === 13){
            (props.match.params?.id)? update() : save();
        }
    }

    useEffect(() => {   
        props.setFormValid(false)                                                                                                                                                                                                  
        props.getModules(accessToken)                                                                                                                                                                                                 
        if (props.match.params.id) {
            const payload={"id":props.match.params.id,"token":accessToken}
            props.getChapitre(payload)
            setSelectedValue(props.chapitre?.idUtilisateur)
        }  /***/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    if(props.valid === true){
        return <Redirect to='/admin/chapitres' />
    }else { 
        return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.chapitres.Gchapitres')}</h6>
                            </div>
                        </div>
                
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onKeyDown={handleSubmitform}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.chapitres.chapitreInfo')}
                                </h6>
                                {/* // id:"identifiant",
            //     libelle:"Libelle",
            //     description:"Description",
            //     contenu:"Contenu",
            //     document:"Document",
            //     lienVideo:"Lien Video", */}
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.chapitres.table.libelle')}
                                        </label>
                                        <input
                                            type="text" name="libelle" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+(i18n.t('admin.chapitres.table.libelle')).toLowerCase()}
                                            defaultValue={( props.chapitre && props.chapitre.libelle !== undefined)?  props.chapitre.libelle: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                            >
                                                {i18n.t('admin.chapitres.table.chapitreModule')}
                                            </label>
                                            <AsyncSelect
                                                styles={{
                                                    option: base => ({
                                                      ...base,
                                                      paddingLeft: '0.75rem',
                                                      paddingRight: '0.75rem',
                                                      fontSize: '0.875rem',
                                                      lineHeight: '0.875rem',
                                                      minHeight:'48px'
                                                    }),
                                                  }}
                                                cacheOptions
                                                defaultOptions
                                                value={props.chapitre?.chapitreModule || selectedValue}
                                                getOptionLabel={e => e.nom}
                                                getOptionValue={e => e.id}
                                                loadOptions={loadOptions}
                                                onInputChange={(e) => handleInputChange(e)}
                                                onChange={(e) => handleChangeOp(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.chapitres.table.description')}
                                        </label>
                                        <input
                                            type="email" name="description" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.chapitres.table.description').toLowerCase()}
                                            defaultValue={( props.chapitre && props.chapitre.description !== undefined)?  props.chapitre.description: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.chapitres.table.lienVideo')}
                                        </label>
                                        <input
                                            type="text" name="lienVideo" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.chapitres.table.lienVideo').toLowerCase()}
                                            defaultValue={( props.chapitre && props.chapitre.lienVideo !== undefined)?  props.chapitre.lienVideo: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                            >
                                                {i18n.t('admin.chapitres.table.contenu')}
                                            </label>
                                            <Editor
                                                // initialValue="<p>This is the initial content of the editor</p>"
                                                initialValue={( props.chapitre && props.chapitre.contenu !== undefined)?  props.chapitre.contenu: "<p>This is the initial content of the editor</p>"}
                                                init={{
                                                skin: false,
                                                content_css: false,
                                                height: 500,
                                                menubar: true,
                                                plugins: [
                                                    'link image',
                                                    'table paste'
                                                ],
                                                toolbar:'checklist | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help'
                                                }}
                                                value={contentEditor}
                                                onEditorChange={handleEditorChange}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.chapitres.userEns')}
                                </h6>

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.chapitres.userEtu')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.chapitres.table.classe')}
                                        </label>
                                        <input
                                            type="text" name="classe" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.chapitres.table.classe').toLowerCase()}
                                            defaultValue={( props.chapitre && props.chapitre.classe !== undefined)?  props.chapitre.classe: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.chapitres.table.mentor')}
                                        </label>
                                        <input
                                            type="text" name="tuteur" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.chapitres.table.mentor').toLowerCase()}
                                            defaultValue={( props.chapitre && props.chapitre.tuteur !== undefined)?  props.chapitre.tuteur: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                </div> */}
                                <div className="mt-4 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                        <button type="button" onClick={()=>{(props.match.params?.id)? update() : save();}}  
                                            disabled={props.loadingForm&&true}
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        >
                                            {props.loadingForm&&<><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span> {i18n.t("admin.loading") }</> } {!props.loadingForm&&i18n.t("admin.save")}
                                        </button>
                                        
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }

}


const mapStateToProps = (state) =>{
  return {
    session:state.session,
    loadingForm:state.loadingForm,
    loadingResource:state.loadingResource,
    modules:state.modules,
    chapitre:state.chapitre,
    valid:state.valid,
  }
}

const mapDispatchToProps = (dispatch)=>{

  return{
    setLoadingAuthForm: (val)=>{
      dispatch(setLoadingAuthForm(val))
    },
    setSession:(val)=>{
      dispatch(setSession(val))
    },
    createChapitre:(payload)=>{
      dispatch(createChapitre(payload))
    },
    getModules:(payload)=>{
      dispatch(getModules(payload))
    },
    getChapitre:(payload)=>{
      dispatch(getChapitre(payload))
    },
    updateChapitre:(payload)=>{
      dispatch(updateChapitre(payload))
    },
    setFormValid:(payload)=>{
      dispatch(setFormValid(payload))
    },
    set_chapitre:(payload)=>{
      dispatch(set_chapitre(payload))
    },
    set_chapitres:(payload)=>{
      dispatch(set_chapitres(payload))
    },

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChapitreForm)

