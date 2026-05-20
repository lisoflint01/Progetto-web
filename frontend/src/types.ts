export interface Patient {
    cf: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    birth_date: Date,
    medical_history: string
}

export interface Appointment {
    appointment_id?: number;  
    patient_cf: string;      
    date: Date;
    initial_time: string;      
    duration: number;           
    note?: string;              
    state: 'prenotato' | 'cancellato' | 'completato';
}

export interface User {
    user_id?: number;          
    username: string;         
    password: string;          
    fullname: string;          
    role: 'admin' | 'operatore';
}