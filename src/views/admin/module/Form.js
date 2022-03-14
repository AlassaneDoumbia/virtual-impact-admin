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
import {getModule, updateModule, createModule, createModuleWithImage, set_module, set_modules} from 'store/actions/module/module';
import {getEnseignants} from 'store/actions/enseignant/enseignant';
// import _ from 'lodash'
import {controlModuleInput} from 'helpers/helperFunctions';

// export default function Login() {
const ModuleForm = (props) => {
    const {  i18n } = useTranslation();
    const location = useLocation();
    const accessToken = useSelector(state => state.accessToken)
    const [inputValue, setInputValue] = useState('')
    const [selectedValue, setSelectedValue] = useState(null);
    const [moduleInfo, setModuleInfo] = useState({
        identifiant:props.match.params?.identifiant,
        nom:"",
        description:"",
        classe:"",
        idUtilisateur:"", 
        file:null, 
    })

    const handleChange = (event) =>{
        setModuleInfo({...moduleInfo,[event.target.name]: event.target.value})
    }
    
    const handleChangeFile = (event) =>{
        
        console.log("File ::::::",event.target.files[0]);
        console.log("File ::::::",event.target.value);
        console.log("moduleInfo ::::::",moduleInfo.file);
        setModuleInfo({...moduleInfo,[event.target.name]: event.target.files[0]})
    }
    

    
    const handleInputChange = (newValue) => {
        console.log("inputValue" + newValue)
        setInputValue(newValue)
    };

    const handleChangeOp = value => {
        console.log("inputValue" + value)
        setSelectedValue(value);
    }

    // const loadOptions = async ( ) => {
    //     // perform a request
    //     console.log(inputValue)
    //     if (inputValue != "" && inputValue.length > 2) {
    //         await searchFunction(inputValue)
    //         return props.customers.results
    //     }else{
    //         await props.getCustomers(accessToken)
    //         return props.customers.results
    //     }
        
    // }

    const filterEnseignants = () => {
        return props.enseignants && props.enseignants !== undefined && props.enseignants.length > 0 && 
        props.enseignants.filter(i =>
          i.nomComplet.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
      
      const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
          callback(filterEnseignants(inputValue));
        }, 1000);
      };

  
    const save = () => {
        let data ={
            nom:moduleInfo.nom ||  props.module.nom ,
            description:moduleInfo.description ||  props.module.description,
            classe:moduleInfo.classe ||  props.module.classe,
            idUtilisateur:selectedValue.identifiant ||  props.module.idUtilisateur,
        }
        let formData = new FormData()
        formData.append("nom",moduleInfo.nom)
        formData.append("description",moduleInfo.description)
        formData.append("classe",moduleInfo.classe)
        formData.append("idUtilisateur",selectedValue.identifiant)
        formData.append("file",moduleInfo.file)
        console.log(data);
        const payload = {data:formData,token:accessToken}
        console.log("payload :::::",payload);
        (controlModuleInput(data))?
        props.createModuleWithImage(payload) : Toast.fail(i18n.t('admin.controlInput'), 3000);
        // props.createModule(payload) : Toast.fail(i18n.t('admin.controlInput'), 3000);
    }
    const update = async () => {
        
        let data ={
            identifiant:props.match.params.id,
            nom:moduleInfo.nom ||  props.module.nom ,
            description:moduleInfo.description ||  props.module.description,
            classe:moduleInfo.classe ||  props.module.classe,
            // idUtilisateur:moduleInfo.idUtilisateur ||  props.module.idUtilisateur,
            idUtilisateur: selectedValue?.identifiant || props.module?.idUtilisateur?.identifiant
        }
        const payload = {data:data,token:accessToken}
        console.log("payload :::::",payload);
        (controlModuleInput(data))?
        props.updateModule(payload) : Toast.fail(i18n.t('admin.controlInput'), 3000);
  
    }
    const handleSubmitform = (event) =>{
        // handleSelectChange(moduleInfo.type)
        if(event.which === 13 || event.keyCode === 13){
            (props.match.params?.id)? update() : save();
        }
    }

    useEffect(() => {   
        props.setFormValid(false)                                                                                                                                                                                                  
        props.getEnseignants(accessToken)                                                                                                                                                                                                 
        if (props.match.params.id) {
            const payload={"id":props.match.params.id,"token":accessToken}
            props.getModule(payload)
            setSelectedValue(props.module?.idUtilisateur)
        }  /***/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    if(props.valid === true){
        return <Redirect to='/admin/modules' />
    }else { 
        return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.modules.Gmodules')}</h6>
                            </div>
                        </div>
                
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form onKeyDown={handleSubmitform}>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.modules.moduleInfo')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.nom')}
                                        </label>
                                        <input
                                            type="text" name="nom" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+(i18n.t('admin.modules.table.nom')).toLowerCase()}
                                            defaultValue={( props.module && props.module.nom !== undefined)?  props.module.nom: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.description')}
                                        </label>
                                        <input
                                            type="email" name="description" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.modules.table.description').toLowerCase()}
                                            defaultValue={( props.module && props.module.description !== undefined)?  props.module.description: ""}   
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.classe')}
                                        </label>
                                        <input
                                            type="text" name="classe" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.modules.table.classe').toLowerCase()}
                                            defaultValue={( props.module && props.module.classe !== undefined)?  props.module.classe: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                            >
                                                {i18n.t('admin.modules.table.idUtilisateur')}
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
                                                value={props.module?.idUtilisateur || selectedValue}
                                                getOptionLabel={e => e.nomComplet}
                                                getOptionValue={e => e.id}
                                                loadOptions={loadOptions}
                                                onInputChange={(e) => handleInputChange(e)}
                                                onChange={(e) => handleChangeOp(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.cover')}
                                        </label>
                                        <input
                                            type="file" name="file" onChange={handleChangeFile} 
                                            // placeholder={i18n.t('admin.enter')+""+i18n.t('admin.modules.table.classe').toLowerCase()}
                                            defaultValue={( props.module && props.module.cover !== undefined)?  props.module.cover: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                </div>

                                {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.modules.userEns')}
                                </h6>

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    {i18n.t('admin.modules.userEtu')}
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.classe')}
                                        </label>
                                        <input
                                            type="text" name="classe" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.modules.table.classe').toLowerCase()}
                                            defaultValue={( props.module && props.module.classe !== undefined)?  props.module.classe: ""} 
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
                                        >
                                            {i18n.t('admin.modules.table.mentor')}
                                        </label>
                                        <input
                                            type="text" name="tuteur" onChange={handleChange} 
                                            placeholder={i18n.t('admin.enter')+""+i18n.t('admin.modules.table.mentor').toLowerCase()}
                                            defaultValue={( props.module && props.module.tuteur !== undefined)?  props.module.tuteur: ""} 
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
    enseignants:state.enseignants,
    module:state.module,
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
    createModule:(payload)=>{
      dispatch(createModule(payload))
    },
    createModuleWithImage:(payload)=>{
      dispatch(createModuleWithImage(payload))
    },
    getEnseignants:(payload)=>{
      dispatch(getEnseignants(payload))
    },
    getModule:(payload)=>{
      dispatch(getModule(payload))
    },
    updateModule:(payload)=>{
      dispatch(updateModule(payload))
    },
    setFormValid:(payload)=>{
      dispatch(setFormValid(payload))
    },
    set_module:(payload)=>{
      dispatch(set_module(payload))
    },
    set_modules:(payload)=>{
      dispatch(set_modules(payload))
    },

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleForm)

