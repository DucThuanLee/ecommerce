import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, EVENTS } from '@shared/rmq/rmq.constants';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject(NOTIFICATION_SERVICE) private readonly client: ClientProxy, // RabbitMQ client
  ) { }

  async create(dto: CreateOrderDto): Promise<Order> {
    const created = new this.orderModel({
      ...dto,
      createdAt: new Date(),
    });
    const savedOrder = await created.save();
    // 📨 Emit event to notification service via RabbitMQ
    this.client.emit(EVENTS.ORDER_CREATED, savedOrder); // topic: order_created
    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
