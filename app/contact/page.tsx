import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
    return (
        <main className="mt-24 mx-16 max-md:mx-4 mb-8 flex justify-center">
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Get in touch with us!</CardTitle>
                    <CardDescription>Fill out your info and our team will get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 gap-1">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" placeholder="Your first name" className="!mb-2" required type="email" />
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lsatName" placeholder="Your last name" className="!mb-2" required />
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Your email address" className="!mb-2" required />
                                <Label htmlFor="name">Message</Label>
                                <Textarea placeholder="Type your message here" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </main>
    )
};