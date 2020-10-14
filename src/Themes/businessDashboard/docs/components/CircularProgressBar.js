export const playground = `
<ThemeProvider theme={theme({ active: true })}>
  <Layout cols={2} gap="10px" justifyItems="center">
    <Cell>
    <CircularProgressBar showProgressIndication size="small" value={50} />
    </Cell>
    <Cell>
      <CircularProgressBar showProgressIndication value={50} />
    </Cell>
    <Cell>
      <CircularProgressBar showProgressIndication size="large" value={50} />
    </Cell>
  </Layout>
</ThemeProvider>
`;
