"use client";

/**
 * 动态表单组件
 * 根据工具定义中的表单配置自动生成表单
 */
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FormField as FormFieldType } from '../registry/types';

interface DynamicFormProps {
  fields: FormFieldType[];
  validationSchema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

/**
 * 动态表单组件
 */
export function DynamicForm({
  fields,
  validationSchema,
  defaultValues,
  onSubmit,
  isLoading = false,
}: DynamicFormProps) {
  // 使用react-hook-form和zod进行表单处理和验证
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  // 处理表单提交
  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label} {field.required && <span className="text-red-500">*</span>}</FormLabel>
                <FormControl>
                  {renderFormControl(field, formField)}
                </FormControl>
                {field.helpText && <FormDescription>{field.helpText}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? '生成中...' : '生成'}
        </Button>
      </form>
    </Form>
  );
}

/**
 * 根据字段类型渲染相应的表单控件
 */
function renderFormControl(field: FormFieldType, formField: any) {
  switch (field.type) {
    case 'text':
      return (
        <Input
          {...formField}
          placeholder={field.placeholder}
          disabled={formField.disabled}
        />
      );
    
    case 'textarea':
      return (
        <Textarea
          {...formField}
          placeholder={field.placeholder}
          rows={field.rows || 5}
          disabled={formField.disabled}
        />
      );
    
    case 'select':
      return (
        <Select
          onValueChange={formField.onChange}
          defaultValue={formField.value}
          disabled={formField.disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || '请选择'} />
          </SelectTrigger>
          <SelectContent>
            {renderSelectOptions(field.options)}
          </SelectContent>
        </Select>
      );
    
    case 'radio':
      return (
        <RadioGroup
          onValueChange={formField.onChange}
          defaultValue={formField.value}
          disabled={formField.disabled}
          className="flex flex-col space-y-2"
        >
          {renderRadioOptions(field.options)}
        </RadioGroup>
      );
    
    default:
      return <div>不支持的字段类型: {(field as any).type}</div>;
  }
}

/**
 * 渲染选择框选项
 */
function renderSelectOptions(options: any[] | undefined) {
  if (!options) return null;
  
  return options.map((option) => {
    const value = typeof option === 'string' ? option : option.value;
    const label = typeof option === 'string' ? option : option.label;
    
    return (
      <SelectItem key={value} value={value}>
        {label}
      </SelectItem>
    );
  });
}

/**
 * 渲染单选框选项
 */
function renderRadioOptions(options: any[] | undefined) {
  if (!options) return null;
  
  return options.map((option) => {
    const value = typeof option === 'string' ? option : option.value;
    const label = typeof option === 'string' ? option : option.label;
    
    return (
      <div key={value} className="flex items-center space-x-2">
        <RadioGroupItem value={value} id={value} />
        <label htmlFor={value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      </div>
    );
  });
}
