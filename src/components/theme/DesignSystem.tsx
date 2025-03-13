"use client";

import React from "react";
import { ButtonCloneRepo } from "../atoms/ButtonCloneRepo";
import { InputText } from "../atoms/InputText";
import { TaskCard } from "../atoms/TaskCard";
import { CheckboxStatus } from "../atoms/CheckboxStatus";

export const DesignSystem = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-display font-bold text-neutral-800 dark:text-neutral-200 mb-8">
        Forq Design System
      </h1>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Color Palette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Primary
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-12 bg-primary-light rounded-md flex items-center justify-center text-primary-foreground font-medium">
                primary-light
              </div>
              <div className="h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-medium">
                primary
              </div>
              <div className="h-12 bg-primary-dark rounded-md flex items-center justify-center text-primary-foreground font-medium">
                primary-dark
              </div>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Secondary
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-12 bg-secondary-light rounded-md flex items-center justify-center text-secondary-foreground font-medium">
                secondary-light
              </div>
              <div className="h-12 bg-secondary rounded-md flex items-center justify-center text-secondary-foreground font-medium">
                secondary
              </div>
              <div className="h-12 bg-secondary-dark rounded-md flex items-center justify-center text-secondary-foreground font-medium">
                secondary-dark
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Accent
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-12 bg-accent-light rounded-md flex items-center justify-center text-accent-foreground font-medium">
                accent-light
              </div>
              <div className="h-12 bg-accent rounded-md flex items-center justify-center text-accent-foreground font-medium">
                accent
              </div>
              <div className="h-12 bg-accent-dark rounded-md flex items-center justify-center text-accent-foreground font-medium">
                accent-dark
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Neutral
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-8 bg-neutral-100 rounded-md flex items-center justify-center text-neutral-800 font-medium">
                neutral-100
              </div>
              <div className="h-8 bg-neutral-300 rounded-md flex items-center justify-center text-neutral-800 font-medium">
                neutral-300
              </div>
              <div className="h-8 bg-neutral-500 rounded-md flex items-center justify-center text-neutral-50 font-medium">
                neutral-500
              </div>
              <div className="h-8 bg-neutral-700 rounded-md flex items-center justify-center text-neutral-50 font-medium">
                neutral-700
              </div>
              <div className="h-8 bg-neutral-900 rounded-md flex items-center justify-center text-neutral-50 font-medium">
                neutral-900
              </div>
            </div>
          </div>

          {/* Feedback Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Feedback
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-8 bg-success rounded-md flex items-center justify-center text-white font-medium">
                success
              </div>
              <div className="h-8 bg-warning rounded-md flex items-center justify-center text-white font-medium">
                warning
              </div>
              <div className="h-8 bg-danger rounded-md flex items-center justify-center text-white font-medium">
                danger
              </div>
              <div className="h-8 bg-info rounded-md flex items-center justify-center text-white font-medium">
                info
              </div>
            </div>
          </div>

          {/* Background/Surface Colors */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Background/Surface
            </h3>
            <div className="flex flex-col space-y-2">
              <div className="h-8 bg-bg-light rounded-md flex items-center justify-center text-neutral-800 font-medium">
                bg-light
              </div>
              <div className="h-8 bg-bg rounded-md flex items-center justify-center text-neutral-800 font-medium">
                bg
              </div>
              <div className="h-8 bg-bg-dark rounded-md flex items-center justify-center text-white font-medium">
                bg-dark
              </div>
              <div className="h-8 bg-surface-light rounded-md flex items-center justify-center text-neutral-800 font-medium">
                surface-light
              </div>
              <div className="h-8 bg-surface rounded-md flex items-center justify-center text-neutral-800 font-medium">
                surface
              </div>
              <div className="h-8 bg-surface-dark rounded-md flex items-center justify-center text-neutral-800 font-medium">
                surface-dark
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Typography
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Headings
            </h3>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-display font-bold text-neutral-800 dark:text-neutral-200">
                  Heading 1 (text-4xl)
                </h1>
              </div>
              <div>
                <h2 className="text-3xl font-display font-semibold text-neutral-800 dark:text-neutral-200">
                  Heading 2 (text-3xl)
                </h2>
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-neutral-800 dark:text-neutral-200">
                  Heading 3 (text-2xl)
                </h3>
              </div>
              <div>
                <h4 className="text-xl font-display text-neutral-800 dark:text-neutral-200">
                  Heading 4 (text-xl)
                </h4>
              </div>
              <div>
                <h5 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                  Heading 5 (text-lg)
                </h5>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Body Text
            </h3>
            <div className="space-y-4">
              <p className="text-base text-neutral-800 dark:text-neutral-300">
                Body Regular (text-base): The quick brown fox jumps over the
                lazy dog. This is standard body text used for most content.
              </p>
              <p className="text-sm text-neutral-700 dark:text-neutral-400">
                Body Small (text-sm): The quick brown fox jumps over the lazy
                dog. This is smaller text often used for secondary information.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-500">
                Caption (text-xs): The quick brown fox jumps over the lazy dog.
                This is used for captions, footnotes, and other auxiliary text.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Components
        </h2>

        <div className="space-y-8">
          {/* Buttons */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <ButtonCloneRepo label="Primary Button" />
              <ButtonCloneRepo label="Disabled Button" disabled />
            </div>
          </div>

          {/* Form Elements */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Form Elements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText
                label="Regular Input"
                value=""
                onChange={() => {}}
                placeholder="Enter value..."
              />
              <InputText
                label="Required Input"
                value=""
                onChange={() => {}}
                placeholder="Required field..."
                required
              />
              <InputText
                label="Input with Error"
                value="Invalid value"
                onChange={() => {}}
                error="This field has an error"
              />
            </div>
          </div>

          {/* Task Cards */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Task Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TaskCard
                title="Example Todo Task"
                description="This is a sample task in the 'todo' state."
                status="todo"
              />
              <TaskCard
                title="Example In Progress Task"
                description="This is a sample task in the 'in-progress' state."
                status="in-progress"
              />
              <TaskCard
                title="Example Done Task"
                description="This is a sample task in the 'done' state."
                status="done"
              />
            </div>
          </div>

          {/* Checkbox Status */}
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Checkbox Status
            </h3>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <CheckboxStatus status="todo" />
                <span className="text-sm text-neutral-600">Todo</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckboxStatus status="in-progress" />
                <span className="text-sm text-neutral-600">In Progress</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckboxStatus status="done" />
                <span className="text-sm text-neutral-600">Done</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing & Alignment */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Spacing & Alignment
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-3">
              Spacing Scale
            </h3>
            <div className="flex flex-wrap items-end gap-4 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary"></div>
                <span className="text-xs mt-1">1</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-primary"></div>
                <span className="text-xs mt-1">1.5</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary"></div>
                <span className="text-xs mt-1">2</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary"></div>
                <span className="text-xs mt-1">3</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary"></div>
                <span className="text-xs mt-1">4</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-primary"></div>
                <span className="text-xs mt-1">6</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-display font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          Accessibility Guidelines
        </h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>
              Use semantic HTML elements (headings, lists, buttons)
              appropriately
            </li>
            <li>
              Maintain color contrast ratios of at least 4.5:1 for normal text
              and 3:1 for large text
            </li>
            <li>Include focus states for all interactive elements</li>
            <li>
              Provide text alternatives for non-text content (alt attributes for
              images)
            </li>
            <li>
              Ensure keyboard navigation works for all interactive elements
            </li>
            <li>Include appropriate ARIA attributes when needed</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default DesignSystem;
