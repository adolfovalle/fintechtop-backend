import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private readonly apiService: ApiService) {}

    @Post('goals')
    async createGoal(@Body() goalData: { name: string; targetAmount: number }) {
        try {
          return await this.apiService.createGoal(goalData);
        } catch (error) {
          throw new HttpException('Failed to create goal', HttpStatus.BAD_REQUEST);
        }
      }

    @Post('deposits')
      async createDeposit(@Body() depositData: { goalId: string; amount: number }) {
        try {
          return await this.apiService.createDeposit(depositData);
        } catch (error) {
          throw new HttpException(
            error.message || 'Failed to create deposit',
            HttpStatus.BAD_REQUEST
          );
        }
    }

    @Get('deposits/:goalId')
    async getDepositsByGoalId(@Param('goalId') goalId: string): Promise<any>{
        return this.apiService.getDepositsByGoalId(goalId);
    }
    
    @Get('goals')
    async getAllGoals(): Promise<any>{
        return this.apiService.getAllGoals();
    }
}
