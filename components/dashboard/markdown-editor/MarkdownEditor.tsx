'use client';
import MDEditor, { commands, MDEditorProps, RefMDEditor } from '@uiw/react-md-editor';
import './MarkdownEditor.css';

export function MarkdownEditor(props: MDEditorProps & React.RefAttributes<RefMDEditor>) {
    return (
        <MDEditor
            overflow={false}
            {...props}
            commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.group(
                    [
                        commands.title1,
                        commands.title2,
                        commands.title3,
                        commands.title4,
                        commands.title5,
                        commands.title6,
                    ],
                    {
                        name: 'title',
                        groupName: 'title',
                        buttonProps: { 'aria-label': 'Insert title' },
                    }
                ),
                commands.divider,
                commands.link,
                commands.quote,
                commands.code,
                commands.codeBlock,
                commands.comment,
                commands.image,
                commands.table,
                commands.divider,
                commands.unorderedListCommand,
                commands.orderedListCommand,
                commands.checkedListCommand,
                commands.divider,
                commands.help,
            ]}
            extraCommands={[
                commands.codeEdit,
                commands.codeLive,
                commands.codePreview,
                commands.fullscreen,
            ]}
        />
    );
}
