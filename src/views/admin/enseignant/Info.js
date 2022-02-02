import React,  {useEffect} from "react";
import {connect, useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next';
import { useLocation} from 'react-router-dom'
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import {setEmailLogin, } from 'store/actions/auth'
import {  getEnseignant } from "store/actions/enseignant/enseignant";
import { useHistory} from 'react-router-dom'

// export default function Login() {
const EnseignantInfo = (props) => {
	const {  i18n } = useTranslation();
    const location = useLocation();
	const history = useHistory()
    const accessToken = useSelector(state => state.accessToken)

	useEffect(() => {                                                                                                                                                                                                           
        if (props.match.params.id) {
            const payload={"id":props.match.params.id,"token":accessToken}
            props.getEnseignant(payload)
        }  /***/
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

	return (
		<>
			<div className="flex flex-wrap mt-4">
				<div className="w-full mb-12 px-4">
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
						<div className="rounded-t bg-white mb-0 px-6 py-6">
							<div className="text-center flex justify-between">
								<h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.users.GStaff')}</h6>
								<button
									className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
									type="button" onClick={() => history.goBack()}
								>
									{i18n.t("admin.retour")}
								</button>
							</div>
						</div>
				
						<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
							<form>
								<h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
									{i18n.t('admin.users.userInfo')}
								</h6>
								<div className="flex flex-wrap">
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.nomCp')}
										</label>
										<input
											type="text" name="nomComplet" disabled 
											placeholder={i18n.t('admin.enter')+""+(i18n.t('admin.users.table.nomCp')).toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.nomComplet !== undefined)?  props.enseignant.nomComplet: ""}   
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.email')}
										</label>
										<input
											type="email" name="email" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.email').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.email !== undefined)?  props.enseignant.email: ""}   
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.username')}
										</label>
										<input
											type="text" name="login" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.username').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.login !== undefined)?  props.enseignant.login: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.password')}
										</label>
										<input
											type="password" name="password" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.password').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.password !== undefined)?  props.enseignant.password: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.birthday')}
										</label>
										<input
											type="date" name="birthday" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.birthday').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.birthday !== undefined)?  props.enseignant.birthday: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.phone_number')}
										</label>
										<input
											type="text" name="numero" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.phone_number').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.numero !== undefined)?  props.enseignant.numero: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-12/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.account_type')}
										</label>
										<select name="role" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										disabled defaultValue="1">
											<option value="0">{i18n.t('admin.users.account_type.ADMIN')}</option>
											<option  value="1">{i18n.t('admin.users.account_type.ENS')}</option>
											<option value="2">{i18n.t('admin.users.account_type.ETU')}</option>
										</select>
										</div>
									</div>
								</div>

								<div className="flex flex-wrap">
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.matricule')}
										</label>
										<input
											type="text" name="matricule" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.matricule').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.matricule !== undefined)?  props.enseignant.matricule: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
										</div>
									</div>
									<div className="w-full lg:w-6/12 px-4">
										<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
										>
											{i18n.t('admin.users.table.specialite')}
										</label>
										<input
											type="text" name="specialite" disabled 
											placeholder={i18n.t('admin.enter')+""+i18n.t('admin.users.table.specialite').toLowerCase()}
											defaultValue={( props.enseignant && props.enseignant.specialite !== undefined) ?  props.enseignant.specialite: ""} 
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
										/>
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


const mapStateToProps = (state) =>{
  return {
    session:state.session,
    authLoadingForm:state.authLoadingForm,
    loadingResource:state.loadingResource,
    enseignant:state.enseignant,
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
	setEmailLogin:(payload)=>{
		dispatch(setEmailLogin(payload))
	},
	getEnseignant:(payload)=>{
		dispatch(getEnseignant(payload))
	},
	 
  

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EnseignantInfo)

