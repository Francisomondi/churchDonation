 import {create} from 'zustand'
import axios from '../../lib/axios'    
import {toast} from 'react-hot-toast'

export const useUserStore = create((set,get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    error: null,    

    register: async (name, email,phone, password, confirmPassword) => {
        set({loading: true, error: null})
        if (password !== confirmPassword) {
                set({loading:false})
                return toast.error("passwords do not match")
            }

        try {                   
                 const response = await axios.post('/auth/register',
                     { name, 
                        email, 
                        phone, 
                        password, 
                       

                     })
            set({ user: response.data.user, loading: false })
            toast.success('Account created successfully!')
            }
           
     catch (error) {
            set({ loading: false, error: error.response.data.message })
            toast.error(error.response.data.message || 'Registration failed')
        }
    }

}))