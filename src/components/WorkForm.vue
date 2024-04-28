<template>
  <div class="mybox">
    <div class="content">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
            
        >
            <form @submit.prevent="submit">
                <v-card
                    elevation="4"
                    class="mycard"
                >
                    <v-row>
                        <v-col cols="12" >ส่วนที่ 1 รายละเอียดของการเปลี่ยนแปลงหรือแก้ไขระบบชื่อเรื่อง {{ invalid }}</v-col>
                    </v-row>
                    <v-row>                        
                        <v-col cols="9" >
                            <validation-provider
                                v-slot="{ errors }"
                                name="title"
                                rules="required"
                            >
                                <v-text-field                                    
                                    
                                    v-model="work.title"
                                    :rules="rules"
                                    :error-messages="errors"
                                    hide-details="auto"     
                                    outlined
                                    data-vv-name="title"
                                    label="ชื่อเรื่อง"
                                ></v-text-field>
                            </validation-provider>
                        </v-col>
                    </v-row>
                </v-card>
            </form>
        </validation-observer>
    </div>
  </div>
</template>

<script>
import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
...required,
message: 'กรุณาใส่ข้อมูล',
})
extend('max', {
...max,
message: 'ความยาวไม่เกิน {length} ตัวอักษร',
})
extend('digits', {
    ...digits,
    message: 'ใส่ได้เฉพาะตัวเลข และจำนวน {length} หลัก',
})
extend('regex', {
    ...regex,
    message: 'รูปแบบข้อมูลไม่ถูกต้อง',
})
export default {
    components: {
      
      ValidationProvider,
      ValidationObserver,
      
        
    },
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data: () => ({
        invalid: false,
        work : {}
    })
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
}
.mybox{
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
}
.content{
    width: 100%;
    padding: 10px;
    
}
.mycard{
    padding: 15px;
}

</style>