import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


// Type definition for a document in MongoDB
export type OrderDocument = Order & Document;


@Schema({ timestamps: true }) // Automatically adds createdAt & updatedAt fields
export class Order {
@Prop({ required: true })
userId: string; // ID of the user who made the order


@Prop({ required: true })
items: Array<{ productId: string; quantity: number }>; // List of ordered items

 // The status of the order. Default = "pending".
  // Could be: "pending", "paid", "shipped", "completed", "cancelled", etc.
@Prop({ default: 'pending' })
status: string; // Order status: pending, paid, shipped, etc.


@Prop()
total: number; // Total order amount (can be calculated)
}

// Generates a Mongoose schema object based on the "Order" class definition
export const OrderSchema = SchemaFactory.createForClass(Order);