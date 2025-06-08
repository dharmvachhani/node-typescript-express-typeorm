import { IsUUID, IsEnum, IsString, IsOptional, IsObject } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('logs')
export class Log {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id!: string;

    @Column({ type: 'enum', enum: ['info', 'warn', 'error', 'debug'] })
    @IsEnum(['info', 'warn', 'error', 'debug'])
    level!: 'info' | 'warn' | 'error' | 'debug';

    @Column({ type: 'text' })
    @IsString()
    message!: string;

    @Column({ type: 'simple-json', nullable: true })
    @IsOptional()
    @IsObject()
    data?: Record<string, any>;

    @Column({ type: 'simple-json', nullable: true })
    @IsOptional()
    @IsObject()
    meta?: Record<string, any>;

    @CreateDateColumn()
    timestamp!: Date;
}
