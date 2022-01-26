import { connect } from 'mongoose'
import { MONGODB_SERVER, MONGODB_DB, ENVIRONMENT } from '../config/environment';

export const startDB = async () => {
    try {
        const db = await connect(`mongodb://${MONGODB_SERVER}/${MONGODB_DB}`);

        if (ENVIRONMENT == 'development')
            console.log('DB Connected on',db.connection.name);
    } catch (e:any) { console.error(e) }
}