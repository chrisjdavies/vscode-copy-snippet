# Copy Snippet for VS Code

![Copy Snippet](images/icon.png)

Copy Snippet is a Visual Studio Code extension for copying text with line
numbers and the file path to the clipboard.  Multi-region selections are
delimited with ellipses.

Created to help with writing vulnerability/bug reports where it's useful to
include focused snippets of source code to explain an issue.

## Example

See the following screenshot of the before/after:

![Screenshot](images/screenshot.png)

The verbatim text copied to the clipboard in this case was:

```text
     [kern/kern_exec.c]
      220 int
      221 sys_execve(struct thread *td, struct execve_args *uap)
      222 {
      ...
      230 	error = exec_copyin_args(&args, uap->fname, UIO_USERSPACE,
      231 	    uap->argv, uap->envv);
      ...
      236 	return (error);
      237 }
```

Notice that:

1. Spaces are used to indent the selection.
2. Ellipses delimit separate regions.

The default indentation included by Copy Snippet is designed to be handy for
numbering lines:

```text
     [kern/kern_exec.c]
      220 int
      221 sys_execve(struct thread *td, struct execve_args *uap)
      222 {
      ...
[1]   230 	error = exec_copyin_args(&args, uap->fname, UIO_USERSPACE,
      231 	    uap->argv, uap->envv);
      ...
      236 	return (error);
      237 }
```

This helps when making references to different parts of the code [1] in a
vulnerability/bug report.

## Commands

Copy Snippet adds the following commands to the command palette:

- Copy Snippet: Copy with path
- Copy Snippet: Copy


## Configuration

|Property|Description|Type|Default value|
|---|---|---|---|
|`copy-snippet.indentation`|The indentation string to use.|String|`     `|
|`copy-snippet.continuationString`|The continuation string to use.|String|`...`|

## Thanks

- Thanks to [Copy With Line Numbers for VS Code](https://github.com/yassh/vscode-copy-with-line-numbers) which I used for inspiration in developing this.
- Thanks to DALL-E 3 for generating the icon/logo.
