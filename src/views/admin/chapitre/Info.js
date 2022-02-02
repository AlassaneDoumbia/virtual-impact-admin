import React, {useState, useEffect} from "react"; 
import { useLocation} from 'react-router-dom'
import {useSelector, connect} from "react-redux";
import { useTranslation } from 'react-i18next';
import { useHistory} from 'react-router-dom'
// import Toast from "light-toast";
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
import {setLoadingAuthForm,setSession} from 'store/actions/index';
import {getChapitre, set_chapitre, set_chapitres} from 'store/actions/chapitre/chapitre';

// export default function Login() {
const ChapitreInfo = (props) => {
  const {  i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory()
  const [selectedValue] = useState(null);
  const [contentEditor, setContentEditor] = useState();
  const accessToken = useSelector(state => state.accessToken)

  const handleEditorChange = (content, editor) => {
		console.log('Content was updated:', content);
		setContentEditor(content);
	}
	
  useEffect(() => {   
      props.set_chapitre(null) 
      props.set_chapitres(null)                                                                                                                                                                                                         
      if (props.match.params.id) {
          const payload={"id":props.match.params.id,"token":accessToken}
          props.getChapitre(payload)
      }  /***/
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // if(!_.isNull(props.session)){
  //   return <Redirect to='/admin' />
  // }else{
    return (
		<>
			<div className="flex flex-wrap mt-4">
				<div className="w-full mb-12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">  
							<div className="rounded-t bg-white mb-0 px-6 py-6">
								<div className="text-center flex justify-between">
									<h6 className="text-blueGray-700 text-xl font-bold">{i18n.t('admin.chapitres.Gchapitres')}</h6>
									<button
										className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
										type="button" onClick={() => history.goBack()}
									>
										{i18n.t("admin.retour")}
									</button>
								</div>
							</div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form >
									<h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
											{i18n.t('admin.chapitres.chapitreInfo')}
									</h6>
									<div className="flex flex-wrap">
										<div className="w-full lg:w-6/12 px-4">
												<div className="relative w-full mb-3">
												<label
														className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"
												>
														{i18n.t('admin.chapitres.table.libelle')}
												</label>
												<input
														type="text" name="libelle"  disabled
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
													<input
															type="text" name="chapitreModule"  disabled
															placeholder={i18n.t('admin.enter')+""+i18n.t('admin.chapitres.table.description').toLowerCase()}
															defaultValue={props.chapitre?.chapitreModule?.nom || selectedValue}   
															className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
														type="text" name="description" disabled
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
														type="text" name="lienVideo" disabled
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
														onEditorChange={(handleEditorChange)}
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
  // }
}


const mapStateToProps = (state) =>{
  return {
    session:state.session,
    authLoadingForm:state.authLoadingForm,
    loadingResource:state.loadingResource,
    modules:state.modules,
    chapitre:state.chapitre,
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
    getChapitre:(payload)=>{
      dispatch(getChapitre(payload))
    },

    set_chapitre:(payload)=>{
      dispatch(set_chapitre(payload))
    },
    set_chapitres:(payload)=>{
      dispatch(set_chapitres(payload))
    },
   

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChapitreInfo)

