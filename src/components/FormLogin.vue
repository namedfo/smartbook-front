<template>
    <div class="wrapper">
        <form @submit.prevent="handleSubmit">

            <input
                :class="v$.form.email.$error ? 'error' : ''"
                type="email"
                class="form-control-input"
                v-model="form.email" 
                placeholder="Email address" />

            <div class="error-text" v-for="(error, index) of v$.form.email.$errors" :key="index">
                {{ error.$message }}
            </div>

            

            <input
                :class="v$.form.password.$error ? 'error' : ''"
                type="password"
                class="form-control-input"
                v-model="form.password" 
                placeholder="Password"/>

            <div class="error-text" v-for="(error, index) of v$.form.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>

            <button 
                :disabled="form.isLogin" 
                type="submit" 
                class="form-control-button-login"
                :class="form.isLogin && 'disabled'"
            >   
                <span v-if="!form.isLogin">
                    Log in
                </span>
                <img v-else src="../assets/loading.gif" height="35" width="35" :style="{background: 'none'}" alt="">
            </button>
            

        </form>

        <span class="forgot">
            forgotten password?
        </span>

        <div class="divider"/>

        <button 
            @click="$emit('setIsShow', true)"
            class="form-control-button-register"
        >
            Create new account
        </button>
    </div>
</template>

<script>
import axios from 'axios'
//
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
//
import { mapActions } from 'vuex';




export default {
    data() {
        return {
            v$: useVuelidate(),
            form: {
                email: '',
                password: '',
                isLogin: false
            }
        }
    },

    validations() {
        return {
            form: {
                email: {required, email},
                password: {required, minLength: minLength(6)}
            }
        }
    },


    methods: {
        setIsLogin(bool) {
            this.form.isLogin = bool
        },

        ...mapActions({
            login: 'auth/login'
        }),

        async handleSubmit() {
            this.v$.form.$touch()
            if (!this.v$.form.$error) {
                this.login({email: this.form.email, password: this.form.password})
            }
        }
    }
}
</script>

<style scoped>
    .wrapper {
        padding: 10px 15px;
        width: 340px;
        height: auto;
        background-color: white;
        box-shadow: 0px 0px 5px rgba(107, 191, 255, 0.25);
        border-radius: 10px;
    }
    

    .forgot {
        color: #252F8B;
        font-size: 12px;
        background: none;
    }

    .divider {
        margin: 20px 0;
        width: 100%;
        height: 1px;
        background-color: #c4c4c4;
        border-radius: 20px;
    }


    /* S T Y L E   F O R   I N P U T S */

    .form-control-input {
        width: 100%;
        padding: 15px; 
        margin: 10px 0;
        border-radius: 5px;
        outline: none;
        border: 1px solid #c4c4c4;
        background: #FDFDFF;
    }



    /* S T Y L E   F O R   B U T T O N S */
    .form-control-button-login {
        background-color: #A94CE2;
        color: white;
        border: none;
        cursor: pointer;
        padding: 13px;
        border-radius: 5px;
        outline: none;
        width: 100%;
        height: auto;
        font-size: 18px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .form-control-button-register {
        background-color: #E4B9FE;
        margin: 0 0 10px 0;
        color: white;
        border: none;
        cursor: pointer;
        padding: 13px;
        border-radius: 5px;
        outline: none;
        width: 100%;
        height: auto;
        font-size: 18px;
    }


    .disabled {
        background-color: rgba(169, 76, 226, 0.2);
        padding: 6px;
    }




    /* S T Y L E   F O R   V A L I D A T I O N */

    
    .error {
        border: 1px solid red;
        box-shadow: 0px 0px 4px rgba(255, 11, 11, 0.25);
    }
    .error::placeholder {
        color: red;
    }

    .error-text {
        color: red;
        font-size: 12px
    }










    /* M E D I A */

    /* 400 */
    @media screen and (max-width: 420px) {
        .wrapper {
            background: none;
            box-shadow: none;
            width: 300px;
        }
    }


    /* 1600 */
    @media screen and (min-width: 1600px) {
        .wrapper {
            width: 435px;

        }
        
        .form-control-input {
            margin: 13px 0;
            padding: 22px 15px; 
            font-size: 20px;
        }
        
        .form-control-button-register {
            margin: 0 0 14px 0;
            padding: 21px 13px;
            font-size: 23px;
        }

        .form-control-button-login {
            margin: 14px 0;
            padding: 21px 13px;
            font-size: 23px;
        }

        .forgot {
            font-size: 15px;
        }

        .error-text {
            color: red;
            font-size: 15px
        }
        .disabled {
            padding: 14px;
        }

    }
</style>