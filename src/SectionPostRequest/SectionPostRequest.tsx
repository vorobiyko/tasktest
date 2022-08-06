import React, {useState} from "react";
import s from './SectionPostRequest.module.css'
import axios  from "axios";
import successReg from './../photos/success-image.svg'

const SectionPostRequest = () => {
    let nameUser: string;
    let emailUser: string;
    let phoneUser: string;
    let position: string;

    const [photoTitle,setPhotoTitle]: any = useState('Upload your photo')
    const [photo,setPhoto]: any = useState(null)

   const getValue = () => {
       let value: any = document.getElementsByTagName('input')
       if (value!==null){
           for (let i:number = 0; i < value.length; i++) {
               if (value[i].id=='user-name'){
                   nameUser=value[i].value
               }
               if (value[i].id=='user-email'){
                   emailUser=value[i].value
               }
               if (value[i].id=='user-tel'){
                   phoneUser=value[i].value
               }
               if (value[i].checked==true){
                   position=value[i].id
               }
           }
           getToken(nameUser,emailUser,phoneUser,position)
       }
   }

   const getToken: (nameUser: any, emailUser: any, phoneUser: any, position: any) => void = async (nameUser, emailUser, phoneUser, position) => {
       let [promise] = await Promise.all([axios.get(' https://frontend-test-assignment-api.abz.agency/api/v1/token')
           .then((data) => postRequest(nameUser, emailUser, phoneUser, position,data.data.token))])
   }

   const postRequest: (nameUser: string, emailUser: string, phoneUser: string, position: string, token: any) => void = async (nameUser, emailUser, phoneUser, position, token) => {
       axios.defaults.headers.common['token'] = token
       let [promise] = await Promise.all([axios.post(' https://frontend-test-assignment-api.abz.agency/api/v1/users',
           photo, {
               headers: {'Content-Type': 'multipart/form-data', 'token': token}, params: {
                   name: nameUser,
                   email: emailUser,
                   phone: phoneUser,
                   position_id: Number(position)
               }
           }
       )]).then((data: any) => checkRegistered(data[0].data))
           .catch((data: any)=> checkRegistered(data.response.data))
   }

   const [registerMessages, setRegisterMessages]: any = useState(null)
   const checkRegistered = (resp: { fails: any; success: boolean; message: string }) => {
        if (resp.success){
            setRegisterMessages(
                <div className={s.success}>
                    <h1>User successfully registered</h1>
                    <img src={successReg}/>
                </div>
            )
        }
        if (!resp.success){
            if (resp.fails!==undefined){
                let keys = Object.values(resp.fails)
                let arrFails: any[] = []
                keys.forEach((key: any)=>{
                    arrFails.push(
                        <h2>{key[0]}</h2>)
                })
                setRegisterMessages(
                    <div>
                        {arrFails}
                    </div>
                )
            }
            else {
                setRegisterMessages(
                    <div>
                        <h2>{resp.message}</h2>
                    </div>
                )
            }
        }
        return registerMessages
   }

    const FileSelectHadler: (e: any) => void = (e)=>{
        let files: any = e.target.files || e.dataTransfer.files
        setPhotoTitle(files[0].name)
        let formData: FormData = new FormData();
        if (files!==null){
            formData.append('photo', files[0]);
            if (nameUser!==undefined){
            }
            setPhoto(formData)
        }
    }

    return(
        <div className={s.mainContainer} id='SingUp'>
            <h1>Working with POST request</h1>
            <form className={s.contentContainer}>
                <div className={s.contactForm}>
                    <label htmlFor="user-name">
                        <input type="text" id='user-name' required
                               placeholder='Your name'/>
                    </label>

                    <label htmlFor="user-email">
                        <input type="email" id='user-email' required
                               placeholder='Email'/>
                    </label>
                    <label htmlFor="user-tel">
                        <input type="tel" id='user-tel' required
                               placeholder='Phone'/>
                        <h3>+38 (XXX) XXX - XX - XX</h3>
                    </label>

                </div>
                <div className={s.positionForm}>
                    <fieldset id='fieldset' >
                        <legend>
                            <h2>Select your position</h2>
                        </legend>

                        <label htmlFor="1">
                            <input type="radio" name="radio" id="1" required/>
                            <h2>Security</h2>
                        </label>

                        <label htmlFor="2">
                            <input type="radio" name="radio" id="2"/>
                            <h2>Designer</h2>
                        </label>

                        <label htmlFor="3">
                            <input type="radio" name="radio" id="3"/>
                            <h2>Content manager</h2>
                        </label>

                        <label htmlFor="4">
                            <input type="radio" name="radio" id="4"/>
                            <h2>Lawyer</h2>
                        </label>
                    </fieldset>
                    <div className={s.upload}>
                        <div className={s.btnUpload}>
                            <h2>Upload</h2>
                            <input onChange={(e: any)=>FileSelectHadler(e)} type="file" accept='image/jpeg, image/jpg'
                                   id='user-photo' required/>
                        </div>
                        <div className={s.infoAboutImage}>
                            <h3>{photoTitle}</h3>
                        </div>

                    </div>
                </div>
            </form>
            <button onClick={getValue}>
                <h2>Sign up</h2>
            </button>
            <div className={s.regStatus}>
                {registerMessages!==null?registerMessages:' '}
            </div>
        </div>
    )
}

export default SectionPostRequest;