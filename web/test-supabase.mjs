import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gwcphkpfxjngkjnpibcm.supabase.co',
  'sb_publishable_1jO32fjP9EAw0JfWMFNlEA_oIfSCNOJ'
)

const testEmail = `test-${Date.now()}@example.com`
console.log('Testing with:', testEmail)

const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email: testEmail }])
  .select()

if (error) {
  console.log('INSERT ERROR:', JSON.stringify(error, null, 2))
} else {
  console.log('INSERT SUCCESS:', JSON.stringify(data, null, 2))
}

// Verify
const { data: d2, error: e2 } = await supabase
  .from('waitlist')
  .select('*')
  .eq('email', testEmail)

if (e2) {
  console.log('SELECT ERROR:', JSON.stringify(e2, null, 2))
} else {
  console.log('SELECT RESULT:', JSON.stringify(d2, null, 2))
}

// Cleanup
const { error: e3 } = await supabase
  .from('waitlist')
  .delete()
  .eq('email', testEmail)

console.log(e3 ? 'DELETE ERROR: ' + e3.message : 'Cleaned up test email')
process.exit(0)
