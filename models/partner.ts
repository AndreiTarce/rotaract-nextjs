import { IPartnerDocument } from '@/interfaces/partner/IPartner';
import mongoose, { Schema } from 'mongoose';

const partnerSchema = new Schema<IPartnerDocument>({
    name: String,
    logoUrl: String,
    link: String,
});

const Partner =
    mongoose.models.Partner || mongoose.model('Partner', partnerSchema);

export default Partner;
