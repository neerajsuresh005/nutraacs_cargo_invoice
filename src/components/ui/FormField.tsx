import React from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn('mb-1 block text-sm font-medium text-neutral-700', className)}
        {...props}
      >
        {children}
        {required && <span className="text-error-500 ml-1">*</span>}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          className
        )}
        {...props}
      />
    );
  }
);

FormInput.displayName = 'FormInput';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          className
        )}
        {...props}
      />
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

FormSelect.displayName = 'FormSelect';

interface FormToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const FormToggle = React.forwardRef<HTMLInputElement, FormToggleProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          {...props}
        />
        <div className={cn(
          "relative w-11 h-6 bg-neutral-300 rounded-full transition-colors peer-focus:ring-4 peer-focus:ring-primary-300",
          props.checked ? "bg-primary-600" : "bg-neutral-300",
          className
        )}>
          <div className={cn(
            "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
            props.checked ? "translate-x-5" : "translate-x-0"
          )}></div>
        </div>
        {label && <span className="ml-3 text-sm font-medium text-neutral-700">{label}</span>}
      </label>
    );
  }
);

FormToggle.displayName = 'FormToggle';

export { FormField, FormLabel, FormInput, FormTextarea, FormSelect, FormToggle };