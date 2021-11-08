import { WorkspaceLayout } from '../components/workspace/workspace-layout';

export const withWorkspaceLayout = (Component) => (props) => (
  <WorkspaceLayout>
    <Component {...props} />
  </WorkspaceLayout>
);
