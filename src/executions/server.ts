import { getApplication } from "../app/helpers/application";
import { EnvConfig } from "../app/helpers/environment";

async function execute() {
  const application = await getApplication();
  await application.init();
  await application.listen(EnvConfig.PORT);
}

execute();
