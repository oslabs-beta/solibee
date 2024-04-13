import { createSignal, Show, useContext, createResource } from 'solid-js';
import { codeToHtml } from 'shiki';
import { StringRepContext } from '../context/StrRepresentationContext';

// web components
import Step from './Step';
import CodeBoxWithCopy from './CodeBoxWithCopy';

// custom components
import InputForm from '../lib/inputForm/InputForm';
import InputFile from '../lib/inputForm/InputFile';
import GenerateOTP from '../lib/inputForm/GenerateOTP';
import InputOTP from '../lib/inputForm/InputOTP';
import ToDoList from '../lib/inputForm/ToDoList';
import DragAndDrop from '../lib/drag-and-drop/Area';

export default function ContentComponent(props) {
  //initialize an install step which will dynamically change instructions based on prop comp
  const installStepCode = `npx solibee add ${props.component}`;
  // this takes care of the string representation of the current component's jsx format code
  const currentComponent = props.component.replaceAll(' ', ''); // converts 'Input Form' to 'InputForm'
  const { string } = useContext(StringRepContext); // this is context that wraps the whole app. This context contains the string representation of each Solibee component saved in an obj;
  const code = string[currentComponent]; // selects the str representation of the component we currently selected ie: Input Form

  const [formattedCode, setFormattedCode] = createSignal();
  const [textToCopy, setTextToCopy] = createSignal(code);
  const [currentComp, setCurrentComp] = createSignal(props.component); // Input Form
  const [formattedStep, setFormattedStep] = createSignal();

  createResource(() => {
    const getHtml = async () => {
      let codeHtml = await codeToHtml(code, {
        lang: 'jsx',
        theme: 'dark-plus',
      });

      let formattedStep = await codeToHtml(installStepCode, {
        lang: 'jsx',
        theme: 'dark-plus',
      });

      setFormattedCode(codeHtml);
      setFormattedStep(formattedStep);

      return codeHtml;
    };
    getHtml();
  });

  return (
    <div class='prose mx-auto w-10/12 min-w-0 max-w-[800px] overflow-auto bg-white/[0.9]'>
      {/* Component name and description */}
      <div class='mb-4 flex max-h-8 items-center text-sm'>
        <div class=''>Components</div>
        <svg class='h-4 w-4'>
          <path d='M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z'></path>
        </svg>
      </div>
      <header class='my-4'>
        <h1 class='my-4 inline-block text-4xl font-bold tracking-tight'>
          {currentComp()}
        </h1>
        <hr />
        <p class='my-5 text-slate-500'>
          {/* TODO: make this description dynamic */}A vertically stacked set of
          interactive headings that each reveal a section of content.
        </p>
      </header>

      <div class='w-full'>
        <p class='text-slate-500'>Preview</p>
        <hr />
        <div class='my-6 flex min-h-[350px] w-full items-center justify-center rounded-md bg-slate-100'>
          <Show when={currentComp() === 'Input Form'}>
            <InputForm />
          </Show>
          <Show when={currentComp() === 'Input File'}>
            <InputFile />
          </Show>
          <Show when={currentComp() === 'Generate OTP'}>
            <GenerateOTP />
          </Show>
          <Show when={currentComp() === 'Input OTP'}>
            <InputOTP />
          </Show>
          <Show when={currentComp() === 'To Do List'}>
            <ToDoList />
          </Show>
          <Show when={currentComp() === 'Drag And Drop'}>
            <DragAndDrop items={2} columns={4} showNewColBtn={false} />
          </Show>
        </div>
      </div>

      {/* Code and preview */}
      <div class='my-5 flex flex-col space-y-4'>
        <div class='w-full'>
          <p class='text-slate-500'>Code</p>
          <hr />
          <div class='relative my-6 w-full'>
            <CodeBoxWithCopy textToCopy={textToCopy()} html={formattedCode()} />
          </div>
        </div>
      </div>

      {/* Guide, usage, etc. */}
      <div class='my-5 mt-12 flex flex-col'>
        <p class='text-2xl tracking-tight text-slate-500' id='installation'>
          Installation Guide
        </p>
        <hr />
        {/* Automatic installation instructions */}
        <section class='mb-5'>
          <h2 class='m-2 text-2xl font-bold'>Automatic Installation</h2>
          <div
            data-orientation='horizontal'
            class='steps relative z-0 mb-12 ml-4 border-l'
          >
            <Step step='Add a component to your project via CLI' />
            <div class='flex-column gap-col-5 m-5'>
              <div class='mb-3'>
                Solibee provides a CLI to help you get started quickly. To use a
                component, for example the Input Form, run the following command
                in your terminal.
              </div>
              <CodeBoxWithCopy
                html={formattedStep()}
                textToCopy={installStepCode}
              />
            </div>

            <Step step='Configure a tailwind.config.js file' />
          </div>
        </section>

        <section class='mb-5'>
          <h2 class='m-2 text-2xl font-bold'>Manual Installation</h2>
          <div
            data-orientation='horizontal'
            class='steps relative z-0 mb-12 ml-4 border-l'
          >
            <Step step='Copy the code of the chosen component' />
            <div class='flex-column gap-col-5 m-5'>
              <div class='mb-3'></div>
            </div>

            <Step step='Refer to our Installation page for more information on how to set the necessary dependencies.' />
            <div class='flex-column gap-col-5 m-5'>
              <div class='mb-3'>
                <a target='_blank' href='/installation' class='solibee-link'>
                  Click here
                </a>{' '}
                to navigate to the Installation Page
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
