# MessageBar component

Use for displaying informational, error, warning messages. Takes title and type as input props, where type can be one of

- "error"
- "warning"
- "info" (Default)

## Example usage

```jsx
import MessageBar from '@/components/MessageBar';

<MessageBar title="Something went wrong" type="error">
  <div className="text-sm text-gray-700 font-medium">Gotta fix it before moving forward...</div>
</MessageBar>;
```
