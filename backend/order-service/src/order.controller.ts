import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { CreateOrderDto } from './dto/create-order.dto';
  import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiParam,
  } from '@nestjs/swagger';
  import { JwtAuthGuard } from './auth/jwt.guard';
  
  @ApiTags('Orders') // Swagger section title
  @ApiBearerAuth()   // Show JWT lock icon globally
  @Controller('orders')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    // Uncomment the guard if you require JWT auth
    // @UseGuards(JwtAuthGuard)
    create(@Body() createOrderDto: CreateOrderDto) {
      return this.orderService.create(createOrderDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders' })
    findAll() {
      return this.orderService.findAll();
    }
  
    @Get('user/:userId')
    @ApiOperation({ summary: 'Get orders by user ID' })
    @ApiParam({ name: 'userId', type: String, description: 'User ID' })
    @ApiResponse({ status: 200, description: 'Orders for a specific user' })
    findByUser(@Param('userId') userId: string) {
      return this.orderService.findByUser(userId);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Order ID' })
    @ApiResponse({ status: 200, description: 'Single order data' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    findOne(@Param('id') id: string) {
      return this.orderService.findOne(id);
    }
  }
  