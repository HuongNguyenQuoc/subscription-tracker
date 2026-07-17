import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/email.js";

const REMINDER = [7, 5, 2, 1];

export const sendReminderEmails = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping reminders.`);
    return;
  }

  for (const daysBefore of REMINDER) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (dayjs().isAfter(reminderDate)) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, "day")) {
      await triggerReminder(context, `${daysBefore} days before minder`, subscription);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return await Subscription.findById(subscriptionId).populate('user', 'userName email');
  });
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    return await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
}




